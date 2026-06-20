import api from '../api';
const { createContext, useReducer, useEffect } = require("react");


export const VisitorContext = createContext()


export const VisitorsReducer = (state , action) =>{
    switch (action.type) {
        case 'SET_VISITOR':
            return {
                visitors : action.payload
            }
        
        case "CREATE_VISITOR":
            return{
                visitors : [action.payload ,...state.visitors]
            }

        case 'UPDATE_VISITOR':
            return {
                visitors : state.visitors.map((visitor) => visitor._id === action.payload._id ? action.payload : visitor)
            }
    
        case "DELETE_VISITOR":
            return {
                visitors : state.visitors.filter((visitor)=> visitor._id !== action.payload)
            }
        
        default : 
            return state
    }
} 



export const VisitorContextProvider = ({children}) =>{

    const [state , dispatch] = useReducer(VisitorsReducer , {
        visitors : null
    })

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const response = await api.get("/visitors")
                dispatch({
                    type: "SET_VISITOR",
                    payload: response.data
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchVisitors()
    }, [])

    return(
        <VisitorContext.Provider value={{...state, dispatch}}>
            {children}
        </VisitorContext.Provider>
    )
}