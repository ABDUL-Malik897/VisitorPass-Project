import { useContext } from "react";
import { VisitorContext } from "../Context/VisitorContext";

export  const useVisitorsContext = () =>{
    const context = useContext(VisitorContext)

    if (!context) {
        throw Error("useVisitorContext must be used inside the a VisitorContextProvider");
        
    }

    return context
} 