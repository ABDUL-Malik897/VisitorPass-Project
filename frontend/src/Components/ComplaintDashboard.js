import api from "../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"
import { useAuthContext } from "../Hooks/useAuthContext";



const ComplaintDashboard = () =>{

    const [complaints , setComplaints] = useState([])
    const [search, setSearch] = useState("");
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [currentPage, setCurrentPage] = useState(1);
    const complaints_per_page = 6;

    const fetchinging_Complaints = async () =>{
        const response = await api.get("/complaints")
        setComplaints(response.data)
    }

    useEffect(()=>{
        if(!user) return
        fetchinging_Complaints()
    },[user])

    const filtering_complaints = complaints.filter((complaint) => {
        const query = search.toLowerCase();
        return (
            complaint.Name?.toLowerCase().includes(query) ||
            complaint.Email?.toLowerCase().includes(query) ||
            complaint.Subject?.toLowerCase().includes(query) ||
            complaint.Status?.toLowerCase().includes(query)
        );
    });

    const sorted__complaints = [...filtering_complaints].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const lastComplaintIndex = currentPage * complaints_per_page;
    const firstComplaintIndex = lastComplaintIndex - complaints_per_page;
    const currentComplaints = sorted__complaints.slice(firstComplaintIndex,lastComplaintIndex);
    const totalPages = Math.ceil(sorted__complaints.length /complaints_per_page);

    const handleResolve = async (id,status) => {
        // console.log("HANDLE RESOLVE CALLED");
        const updateData = {
            Status : status
        }
        // console.log(updateData)
        if (status === "Resolved") {
            updateData.ResolvedAt = new Date()
        }
        await api.patch(`/complaints/${id}`,updateData)
        fetchinging_Complaints()
    }

    const handleback = () => {
        navigate("/admin")
    }

    return (
        <>
            <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button> 
        <div className="complaint-admin-dashboard">
            <div className="complaint-dashboard">
            <div className="search-container">
                <h2>All Complaints</h2>
                    <input
                    type="text"
                    placeholder="Search Complaint..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    />
                </div>
            <div className="pqr">
                {
                currentComplaints.map((complaint) => (
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

export default ComplaintDashboard