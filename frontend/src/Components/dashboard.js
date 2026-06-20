import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useVisitorsContext } from "../Hooks/useVisitorContext";
import emailjs from '@emailjs/browser';
import QRCode from 'qrcode';
import { useNavigate } from "react-router-dom";
import "../index.css"




const Dashboard = () => {

    const {visitors , dispatch} = useVisitorsContext()
    const [loadingState , setLoadingState] = useState({id : null , action : null})
    const navigate = useNavigate()


    const fetchVisitors = useCallback(async() =>{
            try{
                const response = await axios.get("/visitors")
                dispatch({type : 'SET_VISITOR' , payload : response.data})
            }catch(error){
                console.log(error);
            }
        },[dispatch])

    useEffect(()=>{
        fetchVisitors()
    },[fetchVisitors])

    const handleApproval = async (id) => {
    try{
        setLoadingState({id , action : "approve"})
        await axios.patch(`/visitors/${id}`,{
            Status:"Approved"
        })
        const approvedVisitor = visitors.find((v)=> v._id === id)
        if (!approvedVisitor) {
            return
        }
        const qrData = `
            Name: ${approvedVisitor.Name}
            Email: ${approvedVisitor.Email}
            Purpose: ${approvedVisitor.Purpose}
            Visit Slot: ${approvedVisitor.VisitTime}
            Status: Approved
            `
        const qrImage = await QRCode.toDataURL(qrData)
        await emailjs.send(
            "service_u2ybdm8",
            "template_8ke2grb",{
                visitor_name: approvedVisitor.Name,
                to_email: approvedVisitor.Email,
                purpose: approvedVisitor.Purpose,
                visit_slot: approvedVisitor.VisitTime,
                qr_image : qrImage
            },
            "K5zojZKgzw0PHkorQ"
        )
        await fetchVisitors()
        setLoadingState({id :null , action : null })
        }catch(error){
        console.log(error)
        setLoadingState({id :null , action : null })
        }}

        const handleReject = async (id) => {
        try{
            setLoadingState({ id : null , action : "reject"})
            await axios.patch(`/visitors/${id}`,{
            Status:"Rejected"
        })
        await fetchVisitors()
        setLoadingState({id : null , action : null})
    }catch(error){
        console.log(error)
        setLoadingState({id :null , action : null })
    }}
    
    const handleback = () => {
        navigate("/admin")
    }


    return (
        <div className="dashboard">
            <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button> 
            <div className="visitors">
                {
                    visitors && visitors.length === 0 ?(
                    <h2>No Visitor Queries Available</h2>
                    ):(
                    visitors && visitors.map((visitor)=>(
                        <div key={visitor._id} className="visitor-person">
                        <p>Visitor's Name : {visitor.Name}</p>
                        <p>Visitor's Phone : {visitor.Phone}</p>
                        <p>Visitor's Email : {visitor.Email}</p>
                        <p>Purpose of Visit : {visitor.Purpose}</p>
                        <p>Status : {visitor.Status}</p>
                        {
                            visitor.Status === "Approved" && (
                            <p>Visitor Approved Successfully</p>
                            )
                        }
                        {
                            visitor.Status === "Rejected" && (
                            <p>Visitor Request Rejected</p>
                            )
                        }
                        {
                            visitor.Status === "Pending" && (
                            <div className='Approvals'>
                            <button
                            onClick={()=>handleApproval(visitor._id)}
                            disabled={loadingState.id === visitor._id}
                            className="visitor-approved"
                            >
                                {
                                    loadingState.id === visitor._id &&
                                    loadingState.action === "approve"
                                    ? "Approving...":"Approve"
                                }
                            </button>
                            <button
                            onClick={()=>handleReject(visitor._id)}
                            disabled={loadingState.id === visitor._id}
                            className="visitor-rejected"
                            >
                                {
                                    loadingState.id === visitor._id &&
                                    loadingState.action === "reject"
                                    ? "Rejecting...":"Reject"
                                }
                                
                            </button>
                            </div>
                            )
                        }
                        </div>
                    ))
                )
                }
            </div>
            {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
    )
}


export default Dashboard