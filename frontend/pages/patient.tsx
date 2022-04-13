import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Stack } from "@chakra-ui/react";
import Dashboard from '../components/Dashboard';
import { UserContext } from '../components/contexts/UserContext';
import React, { useContext, useState } from 'react';

export enum PatientTabs {
  ScheduleAppointment,
  MedicalHistory,
  Logout
};

const Patient: NextPage = () => {
  const { logout } = useContext(UserContext);

  const [selectedTab, setSelectedTab] = useState<number>(0);

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
          menuPanelButtons={["Schedule Appointment", "Medical History", "Logout"]}
          titles={["Your upcoming appointments", "Your medical history"]}
        >
          <Stack spacing="1rem">
            {selectedTab === PatientTabs.ScheduleAppointment && "Schedule Appointment"}
            {selectedTab === PatientTabs.MedicalHistory && "Medical History"}
          </Stack>
        </Dashboard>
      </Flex>
    </div >
  )
}

export default Patient
