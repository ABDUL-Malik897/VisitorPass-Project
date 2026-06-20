import { useContext } from "react";
import { ComplaintContext } from "../Context/ComplaintContext";

export const useComplaintContext = () =>{
    const context = useContext(ComplaintContext)
    
    if(!context){
        throw Error("useComplaintContext error")
    }
    return context
}