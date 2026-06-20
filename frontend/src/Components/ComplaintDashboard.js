import api from "../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"


const ComplaintDashboard = () =>{
    const [complaints , setComplaints] = useState([])
    const navigate = useNavigate()

    const fetchComplaints = async () =>{
        const response = await api.get("/complaints")
        setComplaints(response.data)
    }

    useEffect(()=>{
        fetchComplaints()
    },[])

    const handleResolve = async (id,status) => {
        console.log("HANDLE RESOLVE CALLED");
        const updateData = {
            Status : status
        }
        console.log(updateData)
        if (status === "Resolved") {
            updateData.ResolvedAt = new Date()
        }
        await api.patch(`/complaints/${id}`,updateData)
        fetchComplaints()
    }

    const handleback = () => {
        navigate("/admin")
    }

    return (
        <div className="complaint-admin-dashboard">
            <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button> 
            <div className="complaint-dashboard">
                <h2>
                All Complaints
            </h2>
            <div className="pqr">
                {
                [...complaints].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((complaint) => (
                    <div key={complaint._id} className="complaint-person">
                        <p>Name :{complaint.Name}</p>
                        <p>Email :{complaint.Email}</p>
                        <p>Type :{complaint.ComplaintType}</p>
                        <p>Message :{complaint.Message}</p>
                        <p>Status :{complaint.Status}</p>
                        {
                            complaint.Status === "Pending" && (
                                <button onClick={()=>handleResolve(complaint._id,"In-Progress")} className="complaint-in-progress">
                                    In-Progess
                                </button>
                            )
                        }
                        {
                            complaint.Status === "In-Progress" && (
                                <button onClick={()=>handleResolve(complaint._id,"Resolved")}className="complaint-resolved">
                                    Resolve
                                </button>
                            )
                        }
                    </div>
                ))
            }
            </div>
            </div>
        </div>
    )
}

export default ComplaintDashboard