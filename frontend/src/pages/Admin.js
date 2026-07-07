import React, { useState } from 'react'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useVisitorsContext } from '../Hooks/useVisitorContext'
import { useComplaintContext } from '../Hooks/useComplaintContext'
import '../index.css'




const Admin = () => {

    const { dispatch : authDispatch } = useAuthContext()
    const navigate = useNavigate()
    const [visitSearch, setVisitSearch] = useState("")
    const [complaintSearch , setComplaintSearch] = useState("")
    const { visitors } = useVisitorsContext()
    const { complaints } = useComplaintContext()


    const totalVisitors = visitors?.length || 0;
    const pendingRequests = visitors?.filter(v=> v.Status === "Pending").length || 0;
    const approvedRequests = visitors?.filter(v=> v.Status === "Approved").length || 0;
    const rejectedRequests = visitors?.filter(v=> v.Status === "Rejected").length || 0;
    const pendingComplaints = complaints?.filter(c=> c.Status === "Pending" || c.Status === " In-Progress").length || 0;
    

    const filtering_visits = visitors?.filter((visit) => visit.Name?.toLowerCase().includes(visitSearch.toLowerCase()) ||  visit.Email?.toLowerCase().includes(visitSearch.toLowerCase()) || visit.Purpose?.toLowerCase().includes(visitSearch.toLowerCase()) || visit.Status?.toLowerCase().includes(visitSearch.toLowerCase()))
    const filtering_complaints = complaints?.filter((complaint) => complaint.ComplaintType?.toLowerCase().includes(complaintSearch.toLowerCase()) || complaint.Message?.toLowerCase().includes(complaintSearch.toLowerCase()) ||complaint.Status?.toLowerCase().includes(complaintSearch.toLowerCase()))

    const handleLogout = () => {
    localStorage.removeItem("user")
    authDispatch({type : "LOGOUT"})
    navigate("/")
    }

    return (
        <>
        <div className='admin-dashboard'>
        <div className='admin-stats'>
        <h2>Admin Dashboard</h2>
        <p>Total Visitors : <span>{totalVisitors}</span></p>
        <p>Pending Requests : <span>{pendingRequests}</span></p>
        <p>Approved Requests : <span>{approvedRequests}</span></p>
        <p>Rejected Requests : <span>{rejectedRequests}</span></p>
        <p>Pending Complaints : <span>{pendingComplaints}</span></p>
        </div>
        <div className='table' id='home'>
            <div>
                <div>
                    <h3>Visit Management</h3>
                    <input type='text' placeholder='Search...'
                    value={visitSearch}
                    onChange={(e)=>setVisitSearch(e.target.value)}/>
                </div>
            <div className='table-scroll'>
                <table border ="5">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Purpose</th>
                        <th>Actions Perform</th>
                    </tr>
                </thead>
                <tbody>
                    {filtering_visits?.map((visitor)=>(
                        <tr key={visitor._id}>
                            <td><img
                            src={`http://localhost:5000/upload/${visitor.Photo}`}
                            alt={visitor.Name}
                            width="70"
                            height="70"
                            style={{
                                bjectFit:"cover",
                                borderRadius:"50%"
                            }}
                            /></td>
                            <td>{visitor.Name}</td>
                            <td>{visitor.Email}</td>
                            <td>{visitor.Purpose}</td>
                            <td>{visitor.Status}</td>
                        </tr>
                    ))}
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
            </div>
            </div>
            <div>
                <div>
                        <h3>Complaint Management</h3>
                        <input type='text' placeholder='Search...'
                        value={complaintSearch}
                        onChange={(e)=>setComplaintSearch(e.target.value)}/>
                    </div>
            <div className='table-scroll'>
                <table border="5">
                <thead>
                    <tr>
                    <th>Complaint Type</th>
                    <th>Message</th>
                    <th>Actions Perform</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtering_complaints?.map((complaint)=>(
                            <tr key={complaint._id}>
                        <td>{complaint.ComplaintType}</td>
                        <td>{complaint.Message}</td>
                        <td>{complaint.Status}</td>
                    </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
            </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
        </div>
        </>
    )
}

export default Admin