import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Text, Stack, Box } from "@chakra-ui/react";
import useApi from '../components/hooks/useApi';
import type { Patient } from '../components/hooks/useApi';
import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import { useRouter } from "next/router";

export enum ReceptionistTabs {
  Patients,
  Employees,
  Logout
};

const Receptionist: NextPage = () => {
  const { getPatients } = useApi();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const router = useRouter();

  const patientsTab = patients.map((patient, index) => (
    <Box key={index}>
      <Text>patientid: {patient.patientid}</Text>
      <Text>ssn: {patient.ssn}</Text>
      <Text>balance: {patient.balance}$</Text>
    </Box>
  ));

  const employeesTab = <></>;

  useEffect(() => {
    const fetchPatients = async () => {
      const patientsList = await getPatients();
      setPatients(patientsList);
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <Head>
        <title>Receptionist</title>
        <meta name="description" content="CSI2132 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex justifyContent="center" alignItems="center" w="100%" h="100vh">
        <Dashboard onSelectTab={id => {
            if (id === ReceptionistTabs.Logout) router.push("/");
            else setSelectedTab(id);
          }}>
          <Stack spacing="1rem">
            {selectedTab === ReceptionistTabs.Patients && patientsTab}
            {selectedTab === ReceptionistTabs.Employees && employeesTab}
          </Stack>
        </Dashboard>
      </Flex>
    </div>
  )
}

export default Receptionist
