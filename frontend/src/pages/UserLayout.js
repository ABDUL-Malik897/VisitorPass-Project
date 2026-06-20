import React, { useEffect , useState } from 'react'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useVisitorsContext } from '../Hooks/useVisitorContext'
import { useComplaintContext } from '../Hooks/useComplaintContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import QRCode from 'react-qr-code'
import "../index.css"
import {format} from "date-fns"


const UserLayout = ({ showProfile ,setShowProfile}) => {
    

    const [visitSearch, setVisitSearch] = useState("")
    const { user , dispatch } = useAuthContext()
    const { visitors , dispatch : visitorDispatch } = useVisitorsContext()
    const { complaints  , dispatch : complaintDispatch } = useComplaintContext()
    const navigate = useNavigate()


    const currentVisitor = visitors?.filter((v) => v.Email === user?.email && !v.VisitEnd && ( v.Status === "Pending" || v.Status === "Approved" || v.Status === "Rejected"))?.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0]

    const currentComplaint = complaints?.filter((v) => v.Email === user?.email)?.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0]

    const complaintExpired = currentComplaint?.ResolvedAt && (new Date() - new Date(currentComplaint.ResolvedAt)) > (60 * 60 * 1000)

    let isExpired = false;
    if (currentVisitor) {
        const endTime = currentVisitor.VisitTime.split("-")[1].trim();
        const expiryDate = new Date(currentVisitor.VisitDate);
        let hour = parseInt(endTime.split(":")[0]);
        const minute = parseInt(endTime.split(":")[1]);
        const ampm = endTime.split(" ")[1];
        if (ampm === "PM" && hour !== 12) {
            hour += 12;
        }
        expiryDate.setHours(hour);
        expiryDate.setMinutes(minute);
        expiryDate.setSeconds(0);
        isExpired = new Date() > expiryDate;
    }

    const myVisits = visitors?.filter((v) =>v.Email === user?.email)
    const myComplaints = complaints?.filter((c) =>c.Email === user?.email)

    const filteredVisits = myVisits?.filter((visit) =>visit.Purpose?.toLowerCase().includes(visitSearch.toLowerCase()) || visit.Status?.toLowerCase().includes(visitSearch.toLowerCase()) ||  visit.VisitDate?.includes(visitSearch))

    useEffect(()=>{
        const fetchVisitors = async ()=>{
            try {
                const response = await axios.get("/visitors")
                visitorDispatch({
                    type : "SET_VISITOR",
                    payload : response.data
                })
            } catch (error) {
                console.log(error);
                
            }
        }
        const fetchComplaints = async () => {
            try{
                const response = await axios.get("/complaints")
                complaintDispatch({
                    type :"SET_COMPLAINT",
                    payload : response.data
                })
            }catch(error){
                console.log(error)
            }
        }
        fetchVisitors()
        fetchComplaints()
    }, [visitorDispatch , complaintDispatch])

    useEffect(()=>{
        const closeExpiredComplaints = async () => {
            if (currentComplaint && currentComplaint.Status ==="Resolved" && complaintExpired){
                try{
                    const response = await axios.patch(`/complaints/${currentComplaint._id}`,{Status : "Closed"})
                    complaintDispatch({
                        type : "UPDATE_COMPLAINT",
                        payload : response.data
                    })
                }catch(error){
                    console.log(error);
                    
                }
            }
        }
        closeExpiredComplaints()
    },[currentComplaint , complaintDispatch , complaintExpired])

    useEffect(()=>{
        const expireVisitor = async () =>{
            if (
                currentVisitor && 
                    (
                        (currentVisitor.Status === "Approved" && isExpired) ||
                        (currentVisitor.Status === "Rejected" &&(new Date() - new Date(currentVisitor.updatedAt)) > (60 * 60 * 1000))
                    )
                ){
                const response = await axios.patch(`/visitors/${currentVisitor._id}`,{VisitEnd : true})
                visitorDispatch({
                    type : "UPDATE_VISITOR",
                    payload : response.data
                })
            }
        }
        expireVisitor()
    },[currentVisitor , isExpired , visitorDispatch])
    
    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch({type : "LOGOUT"})
        navigate("/")
    }

    const handleCompleteVisit = async () => {
        try {
            const response = await axios.patch(
                `/visitors/${currentVisitor._id}`,{VisitEnd :true}
            )
            visitorDispatch({
            type: "UPDATE_VISITOR",
            payload: response.data
        })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className='user'>
            <h2 id='home'> Welcome , {user?.name}</h2>
            <div className='user-panel'>
                    <h3>User Panel</h3>
                    <p className='email-address'>{user?.email}</p>
                    <p>QR Status : <span className={currentVisitor?.Status?.toLowerCase()}>{currentVisitor?.Status || "No-Request-Yet"}</span></p>
                    {
                        currentVisitor?.Status ==="Pending" &&
                        <div>
                            <p>Your request has been sent to admin</p> 
                            <p>Please wait for approval</p>
                        </div>
                    }
                    {
                        currentVisitor?.Status === "Approved" && !isExpired &&(
                            <div className='qr-card'>
                                <p>Adimn Approved your request</p>
                                <p>Visit Date : <span>{" "}{format(new Date(currentVisitor.VisitDate),"dd-MM-yyyy")}</span></p>
                                <div className='qr-box'>
                                    <QRCode
                                        value={`
                                        Name: ${currentVisitor?.Name}
                                        Email: ${currentVisitor?.Email}
                                        Purpose: ${currentVisitor?.Purpose}
                                        Status: ${currentVisitor?.Status}
                                        `}
                                        size={150}
                                        />
                                </div>
                                <p>Visit Slot : <span>{currentVisitor?.VisitTime}</span></p>
                                <button 
                                className="complete"
                                onClick={handleCompleteVisit}>
                                    Complete Visit
                                </button>
                            </div>
                        )
                    }
                    {
                        isExpired && 
                        (
                            <div>
                                <p>Previous Result</p><span>QR Expired</span>
                            </div>
                        )
                    }
                    {
                        currentVisitor?.Status === "Rejected" &&
                        (
                            <div>
                                <p>Your request was rejected</p>
                            </div>
                        )
                    }
                    {
                        complaints && 
                        (
                            <p>
                            Complaint Status : <span className={currentComplaint?.Status?.toLowerCase()}>{
                                complaintExpired ? "No-Complaint-Yet" :
                            currentComplaint?.Status || "No-Complaint-Yet"
                            }</span>
                            </p>
                        )
                    }
                    {
                        currentComplaint?.Status === "Resolved" &&
                        (
                            <div>
                                <p>Your complaint was resolved.</p>
                            </div>
                        )
                    }
                    {
                        currentComplaint?.Status === "In-Progress" &&
                        (
                            <div>
                                <p>Your complaint is in progress.</p>
                            </div>
                        )
                    }
            </div>
        </div>
        { 
            showProfile && (
                <div className='sidebar'>
            <button onClick={()=> setShowProfile(false)}>X</button>
            <div className='profile'>
                <h3>Profile</h3>
                <p>Name : {user?.name}</p>
                <p>Email : {user?.email}</p>
                <p>Role : {user?.role}</p>
            </div>
            <div className='Visit-history'>
                <div className='history-header'>
                <h3>Visit History</h3>
                <input type='text' placeholder='Search...'
                value={visitSearch}
                onChange={(e)=>setVisitSearch(e.target.value)}/>
                </div>
                <div className='visit-list'>
                    {
                    filteredVisits?.map((visit) =>(
                        <div key={visit._id}>
                            <p>Date : {format(new Date(visit.VisitDate),"dd-MM-yyyy")}</p>
                            <p>Purpose : {visit.Purpose}</p>
                            <p>Status : {visit.Status}</p>
                        </div>
                    ))
                }
                </div>
            </div>
            <div className='Complaint-history'>
                <h3>Complaint History</h3>
                {
                    myComplaints?.map((complaint)=>(
                        <div key={complaint._id}>
                            <p>Type : {complaint.ComplaintType}</p>
                            <p>Message : {complaint.Message}</p>
                            <p>Status : {complaint.Status}</p>
                        </div>
                    ))
                }
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
        
            )
            
        }
        </>

    )
}

export default UserLayout