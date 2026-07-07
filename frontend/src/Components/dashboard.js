import React, { useState, useEffect, useCallback } from "react";
import api from "../api";
import { useVisitorsContext } from "../Hooks/useVisitorContext";
import emailjs from '@emailjs/browser';
import QRCode from 'qrcode';
import { useNavigate } from "react-router-dom";
import "../index.css"
import { useAuthContext } from "../Hooks/useAuthContext";





const Dashboard = () => {

    const {visitors , dispatch} = useVisitorsContext()
    const [loadingState , setLoadingState] = useState({id : null , action : null})
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const visitors_per_page = 6;

    const filtering_visitors = visitors?.filter((visitor) => {
        const query = search.toLowerCase();
        return (
            visitor.Name?.toLowerCase().includes(query) ||
            visitor.Email?.toLowerCase().includes(query) ||
            visitor.Phone?.toString().includes(query) ||
            visitor.Purpose?.toLowerCase().includes(query)
        );
    });

    const lastVisitorIndex = currentPage * visitors_per_page;
    const firstVisitorIndex = lastVisitorIndex - visitors_per_page;
    const current_visitors = filtering_visitors.slice(firstVisitorIndex,lastVisitorIndex);


    const fetchVisitors = useCallback(async() => {
            try{
                const response = await api.get("/visitors")
                dispatch({type : 'SET_VISITOR' , payload : response.data})
            }catch(error){
                if (error.response?.status !== 401) {
                    console.error(error);
                }
            }
        },[dispatch])

    useEffect(()=>{
        if(!user) return
        fetchVisitors()
    },[fetchVisitors , user])

    const handleApproval = async (id) => {
    try{
        setLoadingState({id , action : "approve"})
        await api.patch(`/visitors/${id}`,{
            Status:"Approved"
        })
        const approved_visitors = visitors.find((v)=> v._id === id)
        if (!approved_visitors) {
            return
        }
        const qrData = `
            Name: ${approved_visitors.Name}
            Email: ${approved_visitors.Email}
            Purpose: ${approved_visitors.Purpose}
            Visit Slot: ${approved_visitors.VisitTime}
            Status: Approved
            `
        const qrImage = await QRCode.toDataURL(qrData)
        await emailjs.send(
            "service_u2ybdm8",
            "template_8ke2grb",{
                visitor_name: approved_visitors.Name,
                to_email: approved_visitors.Email,
                purpose: approved_visitors.Purpose,
                visit_slot: approved_visitors.VisitTime,
                qr_image : qrImage
            },
            "K5zojZKgzw0PHkorQ"
        )
        await fetchVisitors()
        setLoadingState({id :null , action : null })
        }catch(error){
        console.error(error)
        setLoadingState({id :null , action : null })
        }}

        const handleReject = async (id) => {
        try{
            setLoadingState({ id : null , action : "reject"})
            await api.patch(`/visitors/${id}`,{
            Status:"Rejected"
        })
        await fetchVisitors()
        setLoadingState({id : null , action : null})
    }catch(error){
        console.error(error)
        setLoadingState({id :null , action : null })
    }}
    
    const handleback = () => {
        navigate("/admin")
    }

    const totalPages = Math.ceil(filtering_visitors.length / visitors_per_page);


    return (
        <>
        <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button>
        <div className="dashboard">
            <div className="search-container">
                <h2>All Requests</h2>
                <input
                type="text"
                placeholder="Search by Name, Email or Phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                />
            </div>
            <div className="visitors">
                {
                    current_visitors && current_visitors.length === 0 ?(
                    <h2>No Visitor Queries Available</h2>
                    ):(
                    current_visitors && current_visitors.map((visitor)=>(
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
            <div className="pagination">
                <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                >Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                >Next
                </button>
            </div>
        </div>
        </>
    )
}


export default Dashboard