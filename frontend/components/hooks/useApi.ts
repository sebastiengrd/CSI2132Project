export type Patient = {
    patientid: number;
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
    employeeid: number;
    salary: string;
    emprole: string;
    emptype: string;
    branchid: number;
    username: string;
    firstname: string;
    middlename: string;
    lastname: string;
    gender: string;
    dateofbirth: string;
    email: string;
    phonenumber: string;

};

const useApi = () => {
    const host = "https://api.project.sebgrd.dev";

    const bindRoute = (route: string) => host + route;

    const getPatients = async (): Promise<Patient[]> => {
        return new Promise((resolve) => {
            fetch(bindRoute("/patient/"))
                .then((res) => res.text())
                .then((text) => resolve(JSON.parse(text)))
        });
    }

    const getPhysicians = async (): Promise<Physician[]> => {
        return new Promise((resolve) => {
            fetch(bindRoute("/physicians"))
                .then((res) => res.text())
                .then((text) => resolve(JSON.parse(text)))
        })
    }

    return {
        getPatients,
        getPhysicians
    };
};

export default useApi;