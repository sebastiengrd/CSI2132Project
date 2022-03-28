import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex } from "@chakra-ui/react";

const Patient: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Patient</title>
        <meta name="description" content="CSI2132 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex justifyContent="center" alignItems="center" w="100%" h="100vh">
      </Flex>
    </div>
  )
}

export default Patient
