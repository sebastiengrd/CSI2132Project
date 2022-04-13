import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Stack } from "@chakra-ui/react";
import Dashboard from '../components/Dashboard';
import { UserContext } from '../components/contexts/UserContext';
import React, { useContext, useState } from 'react';

export enum DentistTabs {
  ScheduleAppointment,
  MedicalHistory,
  Logout
};

const Dentist: NextPage = () => {
  const { logout } = useContext(UserContext);

  const [selectedTab, setSelectedTab] = useState<number>(0);


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
            {selectedTab === DentistTabs.ScheduleAppointment && "Appointments"}
            {selectedTab === DentistTabs.MedicalHistory && "Patients"}
          </Stack>
        </Dashboard>
      </Flex>
    </div >
  )
}

export default Dentist
