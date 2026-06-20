import axios from "axios";
import React ,{ useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useComplaintContext } from "../Hooks/useComplaintContext";
import { useNavigate } from "react-router-dom";



const Complains = () =>{

    const {user} = useAuthContext()
    const {dispatch} = useComplaintContext()
    const [ComplaintType , setComplaintType] = useState('')
    const [Message , setMesssge] = useState("")
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const complaint = {
            Name : user?.name || user?.email,
            Email : user?.email,
            ComplaintType,
            Message,
            Status : "Pending"
        }
        try{
            setLoading(true)
            const response = await axios.post("/complaints",complaint)
            dispatch({
                type : "CREATE_COMPLAINT",
                payload : response.data
            })
            setLoading(false)
            setComplaintType("")
            setMesssge("")
            navigate("/userlayout")
        }catch(error){
            setError(error.response.data.error)
            setLoading(false)          
        }
    }

    const handleback = () => {
        navigate("/userlayout")
    }

    return(
        <div className="page">
            <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button> 
            <div className="complaint-form">
            <h2>Complaint Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Complaint Type</label>
                <select
                value={ComplaintType}
                onChange={(e)=>setComplaintType(e.target.value)}>
                    <option value="">Select</option>
                    <option value="QR Issue">QR Issue</option>
                    <option value="Approval Delay">Approval Delay</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Other">Other</option>

                </select>
                <label>Message</label>
                <textarea value={Message} onChange={(e)=>{setMesssge(e.target.value)
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";}}
                    placeholder="Text"/>
                <button type="submit" disabled={loading}>{loading? "loading":"Submit"}</button>

                {
                    error && <p className="error">{error}</p>
                }
            </form>
        </div>
        </div>
    )
}

export default Complains