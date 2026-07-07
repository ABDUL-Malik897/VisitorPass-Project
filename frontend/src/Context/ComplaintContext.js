import { createContext, useReducer , useEffect } from "react";
import api from '../api'
import { useAuthContext } from "../Hooks/useAuthContext";


export const ComplaintContext  = createContext()

export const complaintReducer = (state ,action) =>{
    switch (action.type) {
        case "SET_COMPLAINT":
            return{
                complaints : action.payload
            }
        case 'CREATE_COMPLAINT':
            return{
                complaints :[
                    action.payload,...state.complaints
                ]
            }
        case "UPDATE_COMPLAINT" :
            return {
                complaints : state.complaints.map(complaint => complaint._id === action.payload._id ? action.payload : complaint)
            }    
        default:
            return state
    }
}

export const ComplaintContextProvider = ({children}) => {
    const [state , dispatch]  = useReducer(
        complaintReducer,{complaints:[]}
    )
    const { user } = useAuthContext()
    useEffect(() => {
        if (!user) return        
        const fetchComplaints = async () => {
            try {
                const response = await api.get("/complaints");

                dispatch({
                    type: "SET_COMPLAINT",
                    payload: response.data
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchComplaints();
    }, [user]);
    return (
        <ComplaintContext.Provider value={{...state, dispatch}}>
            {children}
        </ComplaintContext.Provider>
    )
}

