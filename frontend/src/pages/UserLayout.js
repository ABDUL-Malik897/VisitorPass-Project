import React, { useEffect , useState } from 'react'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useVisitorsContext } from '../Hooks/useVisitorContext'
import { useComplaintContext } from '../Hooks/useComplaintContext'
import { useNavigate } from 'react-router-dom'
import api from '../api';
import QRCode from 'react-qr-code'
import "../index.css"
import {format} from "date-fns"
import genPDF from '../utils/genPDF'
// import avatar from "../Image/1783173637594_836340575.png";



const UserLayout = ({ showProfile ,setShowProfile}) => {
    

    const [visitSearch, setVisitSearch] = useState("")
    const { user , dispatch } = useAuthContext()
    const { visitors , dispatch : visitorDispatch } = useVisitorsContext()
    const { complaints  , dispatch : complaintDispatch } = useComplaintContext()
    const navigate = useNavigate()
    // const [selectedImage, setSelectedImage] = useState(null);


    const curr_visitor = visitors?.filter((v) => v.Email === user?.email && !v.VisitEnd && ( v.Status === "Pending" || v.Status === "Approved" || v.Status === "Rejected"))?.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0]
    const curr_complaint = complaints?.filter((v) => v.Email === user?.email)?.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0]
    const complaint_expired = curr_complaint?.ResolvedAt && (new Date() - new Date(curr_complaint.ResolvedAt)) > (60 * 60 * 1000)

    let isExpired = false;
    if (curr_visitor) {
        const endTime = curr_visitor.VisitTime.split("-")[1].trim();
        const expiryDate = new Date(curr_visitor.VisitDate);
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

    const filtering_visits = myVisits?.filter((visit) =>visit.Purpose?.toLowerCase().includes(visitSearch.toLowerCase()) || visit.Status?.toLowerCase().includes(visitSearch.toLowerCase()) ||  visit.VisitDate?.includes(visitSearch))

    useEffect(()=>{
        if (!user) return
        const fetchVisitors = async ()=>{
            try {
                const response = await api.get("/visitors")
                visitorDispatch({
                    type : "SET_VISITOR",
                    payload : response.data
                })
            } catch (error) {
                console.error(error);
                
            }
        }
        const fetchComplaints = async () => {
            try{
                const response = await api.get("/complaints")
                complaintDispatch({
                    type :"SET_COMPLAINT",
                    payload : response.data
                })
            }catch(error){
                if (error.response?.status !== 401) {
                    console.error(error)
                }
            }
        }
        fetchVisitors()
        fetchComplaints()
    }, [visitorDispatch , complaintDispatch , user])

    useEffect(()=>{
        const close_the_expired_complaints = async () => {
            if (curr_complaint && curr_complaint.Status ==="Resolved" && complaint_expired){
                try{
                    const response = await api.patch(`/complaints/${curr_complaint._id}`,{Status : "Closed"})
                    complaintDispatch({
                        type : "UPDATE_COMPLAINT",
                        payload : response.data
                    })
                }catch(error){
                    console.error(error);
                    
                }
            }
        }
        close_the_expired_complaints()
    },[curr_complaint , complaintDispatch , complaint_expired])

    useEffect(()=>{
        const expireVisitor = async () =>{
            if (
                curr_visitor && 
                    (
                        (curr_visitor.Status === "Approved" && isExpired) ||
                        (curr_visitor.Status === "Rejected" &&(new Date() - new Date(curr_visitor.updatedAt)) > (60 * 60 * 1000))
                    )
                ){
                const response = await api.patch(`/visitors/complete/${curr_visitor._id}`)
                visitorDispatch({
                    type : "UPDATE_VISITOR",
                    payload : response.data
                })
            }
        }
        expireVisitor()
    },[curr_visitor , isExpired , visitorDispatch])
    
    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch({type : "LOGOUT"})
        navigate("/")
    }

    const handleCompleteVisit = async () => {
        try {
            const response = await api.patch(
                `/visitors/complete/${curr_visitor._id}`
            )
            visitorDispatch({
            type: "UPDATE_VISITOR",
            payload: response.data
        })
        } catch(error) {
            console.error(error)
        }
    }

//     const handleUpload = async () => {
//     if (!selectedImage) return;
//     const formData = new FormData();
//     formData.append("profilePic", selectedImage);
//     try {
//         const response = await api.patch(
//             "/users/profile-picture",
//             formData
//         );
//         localStorage.setItem(
//             "user",
//             JSON.stringify(response.data)
//         );
//         dispatch({
//             type: "LOGIN",
//             payload: response.data
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

    return (
        <>
        <div className='user'>
            <h2 id='home'> Welcome , {user?.name}</h2>
            <div className='user-panel'>
                    <h3>User Panel</h3>
                    <p className='email-address'>{user?.email}</p>
                    <p>QR Status : <span className={curr_visitor?.Status?.toLowerCase()}>{curr_visitor?.Status || "No-Request-Yet"}</span></p>
                    {
                        curr_visitor?.Status ==="Pending" &&
                        <div>
                            <p>Your request has been sent to admin</p> 
                            <p>Please wait for approval</p>
                        </div>
                    }
                    {
                        curr_visitor?.Status === "Approved" && !isExpired &&(
                            <div className='qr-card'>
                                <p>Adimn Approved your request</p>
                                <p>Visit Date : <span>{" "}{format(new Date(curr_visitor.VisitDate),"dd-MM-yyyy")}</span></p>
                                <div className='qr-box'>
                                    <QRCode
                                        value={JSON.stringify({visitorId : curr_visitor._id})}
                                        size={180}
                                        />
                                </div>
                                <p>Visit Slot : <span>{curr_visitor?.VisitTime}</span></p>
                                <button 
                                className="complete"
                                onClick={handleCompleteVisit}>
                                    Complete Visit
                                </button>
                                <button
                                className='complete'
                                onClick={() => genPDF(curr_visitor)}>
                                    Download this in PDF
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
                        curr_visitor?.Status === "Rejected" &&
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
                            Complaint Status : <span className={curr_complaint?.Status?.toLowerCase()}>{
                                complaint_expired ? "No-Complaint-Yet" :
                            curr_complaint?.Status || "No-Complaint-Yet"
                            }</span>
                            </p>
                        )
                    }
                    {
                        curr_complaint?.Status === "Resolved" &&
                        (
                            <div>
                                <p>Your complaint was resolved.</p>
                            </div>
                        )
                    }
                    {
                        curr_complaint?.Status === "In-Progress" &&
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
                    filtering_visits?.map((visit) =>(
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