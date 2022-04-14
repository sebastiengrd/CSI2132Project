import React, { useEffect, useState } from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   Stack,
   Text,
   Select,
   Input,
   Box
} from "@chakra-ui/react";
import { getPhysicians, Patient, Physician, Appointment, bookAppointment } from "./hooks/useApi";


export type BookAppointmentModalProps = {
   isOpen: boolean,
   onClose: () => void,
   patient: Patient,
}

export const durations = ["30m", "1h", "1h30", "2h"];

export const parseDate = (startDate: Date, duration: string): { date: string, startTime: string, endTime: string } => {
   let durationH = 0.5;
   if (duration === "1h") durationH = 1;
   if (duration === "1h30") durationH = 1.5;
   if (duration === "2h") durationH = 2;

   const endDate = new Date(startDate.getTime() + durationH * 60 * 1000 * 60)

   let dateStr = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
   let startTimeStr = startDate.getHours() + ":" + startDate.getMinutes() + ":00";
   let endTimeStr = endDate.getHours() + ":" + endDate.getMinutes() + ":00";

   return {
      date: dateStr,
      startTime: startTimeStr,
      endTime: endTimeStr
   };
}

const BookAppointmentModal = (props: BookAppointmentModalProps) => {
   const { isOpen, onClose, patient } = props;
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [physicians, setPhysicians] = useState<Physician[]>([]);
   const [selectedPhysicianId, setSelectedPhysicianId] = useState<string>();
   const [startDate, setStartDate] = useState<Date>();
   const [duration, setDuration] = useState<string>("30m");
   const [appointmentType, setAppointmentType] = useState<string>("");
   const [status, setStatus] = useState<string>("Confirmed");
   const [room, setRoom] = useState<String>("1");

   const onBook = async () => {
      if (!!startDate && !!duration && !!appointmentType && !!status && !!room) {
         setIsLoading(true);
         const { date: dateStr, startTime: startTimeStr, endTime: endTimeStr } = parseDate(startDate, duration);
         const appointment = {
            patientid: patient.patientid,
            employeeid: selectedPhysicianId,
            date: dateStr,
            starttime: startTimeStr,
            endtime: endTimeStr,
            appointtype: appointmentType,
            status,
            room,
            invoiceid: null
         } as Appointment;

         bookAppointment(appointment)
            .then(success => {
               if (!success) {
                  setError("An unexpected error occured.");
                  setIsLoading(false);
               } else {
                  onClose();
               }
            });
      }
   }

   const fullName = `${patient.firstname} ${patient.middlename ?? ""} ${patient.lastname}`;

   const physiciansNames = physicians.map(p => (
      `${p.emprole.toLowerCase() == "dentist" ? "Dr." : "Hyg."} ${p.firstname} ${p.middlename ?? ""} ${p.lastname}`
   ));

   const physiciansOptions = physiciansNames.map((name, index) => (
      <option value={physicians[index].employeeid} key={index}>{name}</option>
   ));

   useEffect(() => {
      const fetchPhysicians = async () => {
         getPhysicians().then(ps => setPhysicians(ps));
      }
      fetchPhysicians();
   }, []);

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Book an appointment for {fullName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Stack>
                  <Text color="red.500" fontWeight={600}>{error}</Text>
                  <Box>
                     <Text>Physician</Text>
                     <Select placeholder="Select a physician" onChange={e => setSelectedPhysicianId(e.target.value)}>
                        {physiciansOptions}
                     </Select>
                  </Box>
                  <Box>
                     <Text>Date and time of appointment</Text>
                     <Input onChange={e => setStartDate(new Date(e.target.value))} type="datetime-local" />
                  </Box>
                  <Box>
                     <Text>Appointment duration</Text>
                     <Select value={duration} onChange={e => setDuration(e.target.value)}>
                        {durations.map((duration, index) => (
                           <option value={duration} key={index}>{duration}</option>
                        ))}
                     </Select>
                  </Box>
                  <Box>
                     <Text>Appointment status</Text>
                     <Select onChange={e => setStatus(e.target.value)}>
                        <option value={"Confirmed"}>Confirmed</option>
                        <option value={"Cancelled"}>Cancelled</option>
                        <option value={"Completed"}>Completed</option>
                     </Select>
                  </Box>
                  <Box>
                     <Text>Room number</Text>
                     <Select onChange={e => setRoom(e.target.value)}>
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                     </Select>
                  </Box>
                  <Box>
                     <Text>Appointment type</Text>
                     <Input onChange={e => setAppointmentType(e.target.value)} type="text" />
                  </Box>
               </Stack>
            </ModalBody>

            <ModalFooter>
               <Button variant='ghost' mr={3} onClick={onClose}>Close</Button>
               <Button colorScheme='blue' onClick={onBook} isLoading={isLoading}>
                  Book
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}

export default BookAppointmentModal;