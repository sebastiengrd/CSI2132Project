import React, { createContext, useState } from "react";
import router from "next/router";

export type UserContextType = {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    logout: () => void;
}

const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }) => {
    const [name, setName] = useState("John Doe");
    
    const logout = () => router.push("/");
    
    return (
        <UserContext.Provider value={{ name, setName, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };