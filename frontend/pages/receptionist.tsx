import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Stack } from "@chakra-ui/react";
import useApi, { Physician } from '../components/hooks/useApi';
import type { Patient } from '../components/hooks/useApi';
import { useContext, useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import { UserContext } from '../components/contexts/UserContext';
import PatientCard from '../components/PatientCard';
import EmployeeCard from '../components/EmployeeCard';
export enum ReceptionistTabs {
  Patients,
  Employees,
  Logout
};

const Receptionist: NextPage = () => {
  const { getPatients, getPhysicians } = useApi();
  const { logout } = useContext(UserContext);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [employees, setEmployees] = useState<Physician[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const patientsTab = patients.map((patient, index) => (
    <PatientCard patient={patient} key={index} />
  ));

  const employeesTab = employees.map((employee, index) => (
    <EmployeeCard employee={employee} key={index} />
  ));

  useEffect(() => {
    if (selectedTab === ReceptionistTabs.Patients && patients.length === 0) {
      const fetchPatients = async () => {
        const patientsList = await getPatients();
        setPatients(patientsList);
      };
      
      fetchPatients();
    }

    if (selectedTab === ReceptionistTabs.Employees && employees.length === 0) {
      const fetchEmployees = async () => {
        const employeesList = await getPhysicians();
        setEmployees(employeesList);
      };
      
      fetchEmployees();
    }

  }, [selectedTab]);

  return (
    <div>
      <Head>
        <title>Receptionist</title>
        <meta name="description" content="CSI2132 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex justifyContent="center" alignItems="center" w="100%">
        <Dashboard onSelectTab={id => {
            if (id === ReceptionistTabs.Logout) logout();
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
