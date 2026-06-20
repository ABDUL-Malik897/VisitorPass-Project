import React, { useState } from 'react'
import api from "../api"
import { useAuthContext } from '../Hooks/useAuthContext'
import { useVisitorsContext } from '../Hooks/useVisitorContext'
import { useNavigate } from 'react-router-dom'





const QrForm = () => {

    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [Purpose, setPurpose] = useState("")
    const [VisitTime, setVisitTime] = useState("")
    const [VisitDate , setVisitDate] = useState("")
    const {user} = useAuthContext()
    const {dispatch} = useVisitorsContext()
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const errors = []

        if (!Name.trim()) errors.push("Name");
        if (!Phone.trim()) errors.push("Phone Number");
        if (!Purpose.trim()) errors.push("Purpose");
        if (!VisitDate) errors.push("Visit Date");
        if (!VisitTime) errors.push("Visit Slot");
        if (errors.length > 0) {
            setError(`${errors.join(", ")} required`);
            return;
        }

        
        const endTime = VisitTime.split("-")[1].trim()
        const expiryDate = new Date(VisitDate)
        let hour = parseInt(endTime.split(":")[0])
        const minute = parseInt(endTime.split(":")[1])
        const ampm = endTime.split(" ")[1]
        if(ampm === "PM" && hour !== 12){
            hour += 12
        }
        expiryDate.setHours(hour)
        expiryDate.setMinutes(minute)
        expiryDate.setSeconds(0)
        const visitor = {
            Name,Phone,Email : user?.email,Purpose,VisitTime,VisitDate, ExpiryTime : expiryDate
        }
        try {
            setLoading(true)
            const response = await api.post("/visitors", visitor)
            dispatch({
            type: "CREATE_VISITOR",
            payload: response.data
        })
        setLoading(false)
        setName("")
        setPhone("")
        setPurpose("")
        setVisitTime("")
        setVisitDate("")
        navigate("/userlayout")
        } catch (error) {
            console.log(error);
            if(error.response){
                console.log(error.response.data);
            }
            setLoading(false)
            
        }
    }
    
    const handleback = () => {
        navigate("/userlayout")
    }


    return (
    <div className='page'>
            <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button> 
        <div className='req-form'>
        <h2>Entry Form</h2>
        <form onSubmit={handleSubmit}>
            <label>Name :</label>
            <input type='text'
            placeholder='Enter your Name'
            value={Name}
            onChange={(e)=>setName(e.target.value)}
            />
            <label>Phone Number :</label>
            <input type='telephone' 
            placeholder='Phone/Mobile Number'
            value={Phone}
            onChange={(e)=> setPhone(e.target.value)}
            />
            <label>Email :</label>
            <input type='email' 
            value={user?.email || ""}
            readOnly
            />
            <label> Purpose of Visit : </label>
            <textarea 
            placeholder='Visitation Purpose'
            value={Purpose}
            onChange={(e)=>{setPurpose(e.target.value)
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";}}/>
            <label>Visitation Date</label>
            <input type='date'
            value={VisitDate}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            onChange={(e)=>setVisitDate(e.target.value)}
            ></input>
            <label>Visit Slot :</label>
            <select
            value={VisitTime}
            onChange={(e) =>{setVisitTime(e.target.value)}}
            >
                <option value="">Select Time</option>
                <option value="12:00 PM - 02:00 PM">
                    12:00 PM - 02:00 PM
                </option>
                <option value="02:00 PM - 04:00 PM">
                    02:00 PM - 04:00 PM
                </option>
                <option value="04:00 PM - 06:00 PM">
                    04:00 PM - 06:00 PM
                </option>
                <option value="06:00 PM - 08:00 PM">
                    06:00 PM - 08:00 PM
                </option>
            </select>
            {
                error && <p className='error'>{error}</p>
            }
            <button type='submit' disabled={loading}>
                {loading?"Sending...":"Send Request"}
            </button>
        </form>
    </div>
    </div>
    )
}

export default QrForm