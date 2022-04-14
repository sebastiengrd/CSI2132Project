import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Dashboard from '../components/Dashboard';
import { UserContext } from '../components/contexts/UserContext';
import { Box, Flex, Stack, Text, theme } from "@chakra-ui/react";
import { getPatientsForPhycisian, getAppointmentsForPhycisian, Patient, AppointmentExtended } from '../components/hooks/useApi';
import MedicalHistory from '../components/MedicalHistory';

export enum DentistTabs {
  ScheduleAppointment,
  MedicalHistory,
  Logout
};

const Dentist: NextPage = () => {
  const { logout, setName } = useContext(UserContext);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [patientsForDentist, setPatientsForDentist] = useState<Patient[]>([]);
  const [appointmentsForDentist, setAppointmentsForDentist] = useState<AppointmentExtended[]>([]);



  useEffect(() => {
    const fetchPatientsForDentist = async () => {
      getPatientsForPhycisian("111111118")
        .then(p => setPatientsForDentist(p))
    }
    fetchPatientsForDentist();
  }, []);

  useEffect(() => {
    const fetchAppointmentsForDentist = async () => {
      getAppointmentsForPhycisian("111111118")
        .then(p => setAppointmentsForDentist(p))
    }
    fetchAppointmentsForDentist();
    setName("Pol");
  }, [setName]);

  const patientsTab = patientsForDentist.map((patient, index) => (
    <Box key={index}>
      <Text>{patient.firstname}</Text>
      <MedicalHistory ssn={patient.ssn} />
    </Box>
  ));

  const appointmentTab = appointmentsForDentist.map((appointment, index) => {
    const fullName = `${appointment.firstname} ${appointment.middlename ?? ""} ${appointment.lastname}`;
    return (
      <Stack key={index} padding="1rem" borderRadius="lg" border={`solid 1px ${theme.colors.gray[200]}`} spacing="1.25rem">
        <Stack direction="row" spacing="1.25rem">
          <Box>
            <Text fontWeight={600}>Patient</Text>
            <Text>{fullName}</Text>
          </Box>
          <Box>
            <Text fontWeight={600}>Gender</Text>
            <Text>{appointment.gender}</Text>
          </Box>
          <Box>
            <Text fontWeight={600}>Email</Text>
            <Text>{appointment.email}</Text>
          </Box>
          <Box>
            <Text fontWeight={600}>Phone number</Text>
            <Text>{appointment.phonenumber}</Text>
          </Box>
        </Stack>
        <Box>
          <Text fontWeight={600} fontSize="lg">Medical history of {fullName}</Text>
          <MedicalHistory ssn={appointment.ssn} />
        </Box>
      </Stack>
    );
  });

  return (
    <div>
      <Head>
        <title>Dentist</title>
        <meta name="description" content="CSI2132 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex justifyContent="center" alignItems="center" w="100%">
        <Dashboard
          onSelectTab={id => {
            if (id === DentistTabs.Logout) logout();
            else setSelectedTab(id);
          }}
          selectedTab={selectedTab}
          menuPanelButtons={["Appointments", "Patients", "Logout"]}
          titles={["Your upcoming appointments", "Your patients"]}
        >
          <Stack spacing="1rem">
            {selectedTab === DentistTabs.ScheduleAppointment && appointmentTab}
            {selectedTab === DentistTabs.MedicalHistory && patientsTab}
          </Stack>
        </Dashboard>
      </Flex>
    </div >
  )
}

export default Dentist
