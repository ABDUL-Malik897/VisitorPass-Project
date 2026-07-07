import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";


const EmployeeDashboard = () => {

    const [employees, setEmployees] = useState([]);
    const [loadingState, setLoadingState] = useState({id: null,action: null});
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const emp_per_page = 6;
    const navigate = useNavigate()
    
    const filtering_emps = employees.filter((employee) => {
        const query = search.toLowerCase();
        return (
            employee.name?.toLowerCase().includes(query) ||
            employee.email?.toLowerCase().includes(query) ||
            employee.phone?.toLowerCase().includes(query) ||
            employee.status?.toLowerCase().includes(query)
        );
    });

    const lastEmployeeIndex = currentPage * emp_per_page;
    const firstEmployeeIndex = lastEmployeeIndex - emp_per_page;
    const currentEmployees = filtering_emps.slice(firstEmployeeIndex,lastEmployeeIndex);
    const totalPages = Math.ceil(filtering_emps.length / emp_per_page);
    
    const fetchEmployees = async () => {
        try {
            const response = await api.get("/employee");
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleApprove = async (id) => {
        try {
            setLoadingState({id,action: "approve"});
            await api.patch(`/employee/approve/${id}`, {
                status: "Approved"
            });
            await fetchEmployees();
            setLoadingState({
                id: null,
                action: null
            });
        } catch (error) {
            console.error(error);
            setLoadingState({id: null,action: null});
        }
    };

    const handleReject = async (id) => {
        try {
            setLoadingState({
                id,action: "reject"
            });
            await api.patch(`/employee/${id}`, {
                status: "Rejected"
            });
            fetchEmployees();
            setLoadingState({id: null,action: null});
        } catch (error) {
            console.error(error);
            setLoadingState({
                id: null,
                action: null
            });
        }
    };

    const handleback = () => {
        navigate("/admin")
    }


    return (
        <>
            <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button> 
        <div className="search-container">
            <h2>Employee Requestings</h2>
                    <input
                    type="text"
                    placeholder="Search Employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    />
                </div>
        <div className="dashboard">
            <div className="visitors">
                {
                currentEmployees.length === 0 ?
                <h2>No Employee Requests Available</h2>
                : currentEmployees.map(employee => (
                <div
                    key={employee._id}
                    className="visitor-person"
                >
                <p>
                    Employee Name : {employee.name}
                </p>
                <p>
                    Email : {employee.email}
                </p>
                <p>
                    Phone : {employee.phone}
                </p>
                <p>
                    Status : {employee.status}
                </p>
                {
                    employee.status === "Approved" && (
                        <p>
                            Employee Approved Successfully
                        </p>
                    )
                }
                {
                    employee.status === "Rejected" && (
                        <p>
                            Employee Request Rejected
                        </p>
                    )
                }
                {
                    employee.status === "Pending" && (
                        <div className="Approvals">
                            <button
                                className="visitor-approved"
                                onClick={() => handleApprove(employee._id)}
                                disabled={loadingState.id === employee._id}
                            >
                            {
                                loadingState.id === employee._id &&
                                loadingState.action === "approve"
                                ? "Approving..." :  "Approve"
                            }
                            </button>
                            <button
                                className="visitor-rejected"
                                onClick={() => handleReject(employee._id)}
                                disabled={loadingState.id === employee._id}
                            >
                            {
                                loadingState.id === employee._id &&
                                loadingState.action === "reject"
                                ? "Rejecting..." : "Reject"
                            }
                            </button>
                        </div>
                    )
                }
                </div>
                ))
            }
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
};


export default EmployeeDashboard;