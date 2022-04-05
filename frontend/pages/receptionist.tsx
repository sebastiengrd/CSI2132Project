import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Text, Stack, Box } from "@chakra-ui/react";
import useApi from '../components/hooks/useApi';
import type { Patient } from '../components/hooks/useApi';
import { useEffect, useState } from 'react';

const Receptionist: NextPage = () => {
  const { getPatients } = useApi();
  const [patients, setPatients] = useState<Patient[]>([]);

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
        <Stack spacing="1rem">
          {patients.map((patient) => (
            <Box>
              <Text>patientid: {patient.patientid}</Text>
              <Text>ssn: {patient.ssn}</Text>
              <Text>balance: {patient.balance}</Text>
            </Box>
          ))}
        </Stack>
      </Flex>
    </div>
  )
}

export default Receptionist
