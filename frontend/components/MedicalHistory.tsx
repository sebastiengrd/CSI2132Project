import React, { useEffect, useState } from 'react';
import { getProceduresForPatient, Procedures } from "./hooks/useApi";
import { TableContainer, Table, TableCaption, Thead, Tr, Tbody, Td, Th, Text } from "@chakra-ui/react";

type MedicalHistoryProps = {
    ssn: string
}

const MedicalHistory = (props: MedicalHistoryProps) => {
    const { ssn } = props;
    const [procedures, setProcedures] = useState<Procedures[]>([]);


    useEffect(() => {
        const fetchMedicalHistory = async () => {
            getProceduresForPatient(ssn)
                .then(p => setProcedures(p))
        }
        fetchMedicalHistory();
    }, [ssn]);

    if (procedures.length === 0) {
        return <Text>No medical history found</Text>
    }

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Medical History</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Appointment Type</Th>
                        <Th>Procedure</Th>
                        <Th>Description</Th>
                        <Th>Tooth Involved</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {procedures.map((p, index) =>
                        <Tr key={index}>
                            <Td>{p.appointtype}</Td>
                            <Td>{p.proctype}</Td>
                            <Td>{p.procdescription}</Td>
                            <Td>{p.toothinvolved}</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default MedicalHistory;