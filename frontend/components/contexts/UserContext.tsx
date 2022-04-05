import React, { createContext, useState } from "react";

export type UserContextType = {
    name: string
}

const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }) => {
    const [name, setName] = useState("John Doe");
    return (
        <UserContext.Provider value={{ name }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };