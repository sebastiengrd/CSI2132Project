import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Flex, Stack, Text, theme } from "@chakra-ui/react";
import Dashboard from '../components/Dashboard';
import { UserContext } from '../components/contexts/UserContext';
import React, { useContext, useState, useEffect } from 'react';
import MedicalHistory from '../components/MedicalHistory';
import { AppointmentExtended, getAppointmentsForPatient } from '../components/hooks/useApi';


export enum PatientTabs {
  ScheduleAppointment,
  MedicalHistory,
  Logout
};

const Patient: NextPage = () => {
  const { setName, logout } = useContext(UserContext);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [appointmentsForPerson, setAppointmentsForPerson] = useState<AppointmentExtended[]>([]);

  useEffect(() => {
    const fetchAppointmentsForPatient = async () => {
      getAppointmentsForPatient("111111112")
        .then(a => setAppointmentsForPerson(a))
    }
    fetchAppointmentsForPatient();
    setName("John Smith")
  }, [setName]);

  // const appointmentTab = appointmentsForPerson.map((appointment, index) => (
  //   // <Box>
  //   //   <Text>Patient Name: {appointment.firstname} Date: {appointment.date} Start time: {appointment.starttime}</Text>
  //   // </Box>

  // ));

  const appointmentTab = appointmentsForPerson.map((appointment, index) => {
    const { firstname, date, starttime, endtime, lastname, room, ssn } = appointment;
    const fullName = `${firstname} ${lastname}`;

    return (
      <Stack padding="1rem" borderRadius="lg" border={`solid 1px ${theme.colors.gray[200]}`} spacing="1.25rem" key={`appointment-card-${index}`}>
        <Stack direction="row" spacing="1.25rem">
          <Box>
            <Text fontWeight={600}>Dentist</Text>
            <Text>{fullName}</Text>
          </Box>
          <Box>
            <Text fontWeight={600}>Date</Text>
            <Text>{date}</Text>
          </Box>
          <Box>
            <Text fontWeight={600}>From</Text>
            <Text>{starttime}</Text>
          </Box>
          <Box>
            <Text fontWeight={600}>To</Text>
            <Text>{endtime}</Text>
          </Box>
          <Box>
            <Text fontWeight={600}>Room</Text>
            <Text>{room}</Text>
          </Box>
        </Stack>
      </Stack>
    )
  });

  const medicalHistoryTab = <MedicalHistory ssn="111111112" />;


  return (
    <div>
      <Head>
        <title>Patient</title>
        <meta name="description" content="CSI2132 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex justifyContent="center" alignItems="center" w="100%">
        <Dashboard
          onSelectTab={id => {
            if (id === PatientTabs.Logout) logout();
            else setSelectedTab(id);
          }}
          selectedTab={selectedTab}
          menuPanelButtons={["Scheduled Appointments", "Medical History", "Logout"]}
          titles={["Your upcoming appointments", "Your medical history"]}
        >
          <Stack spacing="1rem">
            {selectedTab === PatientTabs.ScheduleAppointment && appointmentTab}
            {selectedTab === PatientTabs.MedicalHistory && medicalHistoryTab}
          </Stack>
        </Dashboard>
      </Flex>
    </div >
  )
}

export default Patient
