import { useContext } from "react";
import { EmployeeContext } from "../Context/EmployeeContext";

export const useEmployeeContext = () => {

    const context = useContext(EmployeeContext);

    if (!context) {
        throw Error("useEmployeeContext must be used inside EmployeeContextProvider");
    }

    return context;
};