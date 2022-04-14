import React, { useContext, useEffect, useState } from 'react';
import { Physician, getProceduresForPatient, Procedures } from "./hooks/useApi";
import { Box, Button, Flex, theme, Text, List, ListItem } from "@chakra-ui/react";
import Field from "./Field";

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
    }, []);

    return (
        <Flex>
            <List>
                {procedures.map(p => <ListItem>{p.date} {p.procdescription} {p.toothinvolved}</ListItem>)}
            </List>
        </Flex >
    );
}

export default MedicalHistory;