import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import useApi, { Physician } from '../components/hooks/useApi';
import type { Patient } from '../components/hooks/useApi';
import React, { useContext, useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import { UserContext } from '../components/contexts/UserContext';
import PatientCard from '../components/PatientCard';
import EmployeeCard from '../components/EmployeeCard';
import EditPatientModal from '../components/EditPatientModal';
import EditEmployeeModal from '../components/EditEmployeeModal';
import BookAppointmentModal from '../components/BookAppointmentModal';
import MenuPanelButton from '../components/MenuPanelButton';

export enum ReceptionistTabs {
  Patients,
  Employees,
  Logout
};

const Receptionist: NextPage = () => {
  const { getPatients, getPhysicians } = useApi();
  const { logout } = useContext(UserContext);

  const [patients, setPatients] = useState<Patient[]>([]);
  patients.sort((p1, p2) => parseInt(p1.patientid) - parseInt(p2.patientid));

  const [employees, setEmployees] = useState<Physician[]>([]);
  employees.sort((e1, e2) => parseInt(e1.employeeid) - parseInt(e2.employeeid));

  const [selectedTab, setSelectedTab] = useState<number>(0);

  // modal states

  const { isOpen: isPatientOpen, onOpen: onPatientOpen, onClose: onPatientClose } = useDisclosure();
  const [patient, setPatient] = useState<Patient>();
  const { isOpen: isEmployeeOpen, onOpen: onEmployeeOpen, onClose: onEmployeeClose } = useDisclosure();
  const [employee, setEmployee] = useState<Physician>();
  const { isOpen: isBookAppointmentOpen, onOpen: onBookAppointmentOpen, onClose: onBookAppointmentClose } = useDisclosure();

  // patients

  const openEditPatientModal = (patient: Patient) => {
    setPatient(patient);
    onPatientOpen();
  };

  const openBookAppointmentModal = (patient: Patient) => {
    setPatient(patient);
    onBookAppointmentOpen();
  };

  const patientsTab = patients.map((patient, index) => (
    <PatientCard
      patient={patient}
      key={index}
      onEdit={patient => openEditPatientModal(patient)}
      onBookAppointment={patient => openBookAppointmentModal(patient)}
    />
  ));

  const updatePatients = (patient: Patient) => {
    const index = patients.findIndex(p => p.ssn === patient.ssn);
    const newPatients = [...patients];
    newPatients[index] = patient;
    setPatients(newPatients);
  }

  // employees

  const openEditEmployeeModal = (employee: Physician) => {
    setEmployee(employee);
    onEmployeeOpen();
  };

  const employeesTab = employees.map((employee, index) => (
    <EmployeeCard employee={employee} key={index} onEdit={employee => openEditEmployeeModal(employee)} />
  ));

  const updateEmployees = (employee: Physician) => {
    const index = employees.findIndex(e => e.ssn === employee.ssn);
    const newEmployees = [...employees];
    newEmployees[index] = employee;
    setEmployees(newEmployees);
  }

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
        <Dashboard
          onSelectTab={id => {
            if (id === ReceptionistTabs.Logout) logout();
            else setSelectedTab(id);
          }}
          selectedTab={selectedTab}
          menuPanelButtons={["Patients", "Employees", "Logout"]}
          titles={["List of all employees", "List of all patients"]}
        >
          <Stack spacing="1rem">
            {selectedTab === ReceptionistTabs.Patients && patientsTab}
            {selectedTab === ReceptionistTabs.Employees && employeesTab}
          </Stack>
        </Dashboard>
      </Flex>
      {
        isPatientOpen &&
        patient &&
        <EditPatientModal
          patient={patient}
          isOpen={isPatientOpen}
          onClose={onPatientClose}
          updatePatients={(patient: Patient) => updatePatients(patient)}
        />
      }
      {
        isEmployeeOpen &&
        employee &&
        <EditEmployeeModal
          employee={employee}
          isOpen={isEmployeeOpen}
          onClose={onEmployeeClose}
          updateEmployees={(employee: Physician) => updateEmployees(employee)}
        />
      }
      {
        isBookAppointmentOpen &&
        patient &&
        <BookAppointmentModal
          patient={patient}
          isOpen={isBookAppointmentOpen}
          onClose={onBookAppointmentClose}
        />
      }
    </div >
  )
}

export default Receptionist
