export type Patient = {
    patientid: string;
    ssn: string;
    balance: string;
    username: string;
    firstname: string;
    middlename: string;
    lastname: string;
    gender: string;
    dateofbirth: string;
    email: string;
    phonenumber: string;
};

export type Physician = {
    employeeid: string;
    ssn: string;
    salary: string;
    emprole: string;
    emptype: string;
    branchid: string;
    username: string;
    firstname: string;
    middlename: string;
    lastname: string;
    gender: string;
    dateofbirth: string;
    email: string;
    phonenumber: string;
};

const host = "https://api.project.sebgrd.dev";

const bindRoute = (route: string) => host + route;

export const getPatients = async (): Promise<Patient[]> => {
    return new Promise((resolve) => {
        fetch(bindRoute("/patient/"))
            .then((res) => res.text())
            .then((text) => resolve(JSON.parse(text)))
    });
};

export const getPhysicians = async (): Promise<Physician[]> => {
    return new Promise((resolve) => {
        fetch(bindRoute("/physicians"))
            .then((res) => res.text())
            .then((text) => resolve(JSON.parse(text)))
    })
};

export const updatePhysician = async (ssn: string, field: string, value: string): Promise<boolean> => {
    return new Promise((resolve) => {
        fetch(bindRoute("/physicians/update_field/"), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ssn,
                field,
                value
            })
        })
            .then(res => resolve(res.status === 200))
    })
};

export const updatePatient = async (ssn: string, field: string, value: string): Promise<boolean> => {
    return new Promise((resolve) => {
        fetch(bindRoute("/patient/update_field/"), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ssn,
                field,
                value
            })
        })
            .then(res => resolve(res.status === 200))
    })
};

const useApi = () => ({
    getPatients,
    getPhysicians,
    updatePhysician,
    updatePatient
});

export default useApi;