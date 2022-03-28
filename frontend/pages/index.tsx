import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import SelectCard from "../components/SelectCard";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Log in</title>
        <meta name="description" content="CSI2132 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex justifyContent="center" alignItems="center" w="100%" h="100vh">
        <Stack alignItems="center" spacing="4rem">
          <Heading>Log in as</Heading>
          <Stack direction="row" spacing="4rem">
            <SelectCard onClick={() => router.push("/patient")}>
              <Stack alignItems="center" spacing="2rem">
                <Heading size="md">Patient</Heading>
                <Text textAlign="center">View your medical records, upcoming appointments.</Text>
              </Stack>
            </SelectCard>
            <SelectCard onClick={() => router.push("/dentist")}>
              <Stack alignItems="center" spacing="2rem">
                <Heading size="md">Dentist</Heading>
                <Text textAlign="center">View patients’ medical records, upcoming appointments.</Text>
              </Stack>
            </SelectCard>
            <SelectCard onClick={() => router.push("/receptionist")}>
              <Stack alignItems="center" spacing="2rem">
                <Heading size="md">Receptionist</Heading>
                <Text textAlign="center">Schedule appointments, edit profile informations.</Text>
              </Stack>
            </SelectCard>
          </Stack>
        </Stack>
      </Flex>

    </div>
  )
}



export default Home
