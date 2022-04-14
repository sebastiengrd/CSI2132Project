import React from "react";
import { Input, Select } from "@chakra-ui/react";
import { Patient, Physician } from "./hooks/useApi";

type FieldEditorProps = {
    fieldsMap: Patient | Physician,
    value: string,
    onChangeValue: (value: string) => void,
    selectedField: string,
    onChangeField: (field: string) => void,
}

const FieldEditor = (props: FieldEditorProps) => {
    const { fieldsMap, value, onChangeValue, selectedField, onChangeField } = props;

    const fields = Object.keys(fieldsMap).filter(value => value !== "ssn" && value !== "username");

    return (
        <>
            <Select placeholder="Select field" value={selectedField} onChange={e => onChangeField(e.target.value)}>
                {fields.map((field, index) => (
                    <option value={field} key={index}>{field.toUpperCase()}</option>)
                )}
            </Select>
            <Input placeholder="New value" value={value} onChange={e => onChangeValue(e.target.value)} />
        </>
    );
}

export default FieldEditor;