import React ,{useState , useEffect} from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

const EmployeeLayout = ({ showProfile, setShowProfile }) => {

    const { user,dispatch } = useAuthContext();
    const navigate = useNavigate()
    // const [showProfile, setShowProfile] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        checkedIn: 0,
        checkedOut: 0
    });
    
    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch({type : "LOGOUT"})
        navigate("/")
    }

    useEffect(() => {

        const fetchVisitors = async () => {
            try {
                const response = await api.get("/visitors");
                const myVisitors = response.data.filter(
                    visitor => visitor.Employee === user?.email
                );
                setStats({
                    total: myVisitors.length,
                    pending: myVisitors.filter(v => v.Status === "Pending").length,
                    approved: myVisitors.filter(v => v.Status === "Approved").length,
                    rejected: myVisitors.filter(v => v.Status === "Rejected").length,
                    checkedIn: myVisitors.filter(v => v.VisitStart).length,
                    checkedOut: myVisitors.filter(v => v.VisitEnd).length
                });
            } catch (error) {
                console.error(error);
            }
        };
        if (user) {
            fetchVisitors();
        }
    }, [user]);

    return (
        <div className="emp-layout">
            <div className="emp-home">
                <h1>Employee Dashboard</h1>
                <h3>Welcome, {user?.name}</h3>
                
            </div>
            {showProfile && (
                <div className="sidebar">
                    <div className="profile">
                        <button
                            className="close-btn"
                            onClick={() => setShowProfile(false)}
                        >
                            X
                        </button>
                        <h2>Employee Profile</h2>
                        <hr />
                        <p><strong>Name  :</strong> {user?.name}</p>
                        <p><strong>Email :</strong> {user?.email}</p>
                        <p><strong>Role  :</strong> {user?.role}</p>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        <div className="emp-stats">
            <h1>My Visitor Statistics</h1>
            <div className="emp-stats-box">
                <div className="emp-stat-box">
                    <h3>Total Visitors</h3>
                    <h1>{stats.total}</h1>
                </div>
                <div className="emp-stat-box">
                    <h3>Checked In</h3>
                    <h1>{stats.checkedIn}</h1>
                    
                </div>
                <div className="emp-stat-box">
                    <h3>Checked Out</h3>
                    <h1>{stats.checkedOut}</h1>
                    
                </div>
                <div className="emp-stat-box">
                    <h3>Pending</h3>
                    <h1>{stats.pending}</h1>
                </div>
                <div className="emp-stat-box">
                    <h3>Approved</h3>
                    <h1>{stats.approved}</h1>
                </div>
                <div className="emp-stat-box">
                    <h3>Rejected</h3>
                    <h1>{stats.rejected}</h1>
                </div>
            </div>
        </div>
        </div>
    );
};

export default EmployeeLayout;