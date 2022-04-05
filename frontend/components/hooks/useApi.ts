type Patient = {
    patientid: number;
    ssn: number;
    balance: number;
};

const useApi = () => {
    const host = "http://localhost:8080";

    const bindRoute = (route: string) => host + route;

    const getPatients = async (): Promise<Patient[]> => {
        return new Promise((resolve) => {
            fetch(bindRoute("/patient/"))
                .then((res) => res.text())
                .then((text) => resolve(JSON.parse(text)))
        });
    }

    return {
        getPatients
    };
};


export default useApi;
export type { Patient };