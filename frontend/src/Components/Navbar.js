import React, { useEffect } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useVisitorsContext } from "../Hooks/useVisitorContext";
import { useComplaintContext } from "../Hooks/useComplaintContext";
// import { useThemeContext } from "../Hooks/useThemeContext";
import "../index.css"
import heroImage from "../Image/VisitorPass-logo.png"
import api from "../api";

const Navbar = ({setShowProfile}) => {
    const navigate = useNavigate();
    const {user} = useAuthContext()
    const { visitors , dispatch : visitorDispatch } = useVisitorsContext()
    const { complaints } = useComplaintContext()
    // const { darkMode, toggleTheme } = useThemeContext();

    const active_complaints = complaints?.find(c=>c.Email === user?.email && (c.Status === "Pending" || c.Status === "In Progress"))
    const can_create_complaints = !active_complaints

    const active_visitors = visitors?.find(v =>v.Email === user?.email && (v.Status === "Pending" ||  v.Status ===  "Approved" )  && !v.VisitEnd)
    const can_gen_qr = !active_visitors

    const pendingreq = visitors?.filter(v => v.Status === "Pending").length || 0
    const pendingComplaints = complaints?.filter(c => c.Status === "Pending").length || 0
    
    useEffect(() => {
        if (!user) return;
        const fetchVisitors = async () => {
            try {
                const response = await api.get("/visitors")
                visitorDispatch({
                    type: "SET_VISITOR",
                    payload: response.data
                })
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.error(error);
                }
            }
        }
        fetchVisitors()
    }, [visitorDispatch , user])

    
    return (
        <nav className="navbar">

            {!user ? (
                <>
            <div className="navbar-logo">
                <h2><a href="/"><img src={heroImage} alt='Visitor Pass'/>
                VisitorPass</a></h2>
            </div>
            <ul className="navbar-links">
                <li>
                    <a href="/#home">Home</a>
                </li>
                <li>
                    <a href="/#features">Features</a>
                </li>
                <li>
                    <a href="/#how-it-works">How It Works</a>
                </li>
                <li>
                    <a href="/#contact">Contact</a>
                </li>
            </ul>
            <div className="navbar-buttons">
                <button
                    className="login-btn"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
                <button
                    className="signup-btn"
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </button>
            </div>
            </>
            ): user.role === "user" ?
                (
                <>
                <div className="navbar-logo-user">
                <h2><Link to="/userlayout"><img src={heroImage} alt='Visitor Pass'/> VisitorPass</Link></h2>
                </div>
                <ul className="navbar-links-user">
                <li>
                    <a href="/userlayout#home">Home</a>
                </li>
                <li>
                    {can_gen_qr ? (
                        <Link to ="/form">Generate QR</Link>
                        
                    ) : (
                        <Link to="/userlayout">QR Activated</Link>
                    )}
                </li>
                <li>
                    {
                    can_create_complaints ? (
                        <Link to="/complaints">Complaints</Link>
                        ) :(
                        <Link to="/userlayout">Complaint Pending</Link>
                        )
                    }
                </li>
                <button 
                className="profile-btn"
                onClick={() => {setShowProfile(true)}}>
                    Profile
                </button>
                {/* <button
                className="theme-btn"
                onClick={toggleTheme}>
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button> */}
                
                </ul>
                </>
                ): user.role === "admin" ? ( 
                    <>
                    <div className="navbar-logo-admin">
                        <div>
                            <h2>
                                <Link to="/admin"><img src={heroImage} alt='Visitor Pass'/> VisitorPass</Link>
                            </h2>
                        </div>
                        <ul className="navbar-links-admin">
                            <li>
                                <a href="/admin#home">Home</a>
                            </li> 
                            <li>
                                { pendingreq !== 0 ? 
                                (
                                <Link to ="/dashboard">Visitor Requests<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="rgb(0, 153, 255)"><path d="M479.79-96Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21Zm.21-396ZM192-216v-72h48v-240q0-87 53.5-153T432-763v-53q0-20 14-34t34-14q20 0 34 14t14 34v27q-11 21-17.5 45t-6.5 50q-6.21-.8-12.1-1.4-5.9-.6-11.9-.6-70 0-119 49t-49 119v240h336v-222q17 5 35.5 6t36.5-1v216.75h48V-216H192Zm419-395q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Z"/></svg></Link>
                                ):(
                                <Link to ="/dashboard">Visitor Requests<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="rgb(0,153,255)"><path d="M192-216v-72h48v-240q0-87 53.5-153T432-763v-53q0-20 14-34t34-14q20 0 34 14t14 34v53q85 16 138.5 82T720-528v240h48v72H192Zm288-276Zm-.21 396Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21ZM312-288h336v-240q0-70-49-119t-119-49q-70 0-119 49t-49 119v240Z"/></svg></Link>
                                )
                                }
                            </li>
                            <li>
                                {pendingComplaints !== 0 ?
                                (
                                <Link to="/complaint-dashboard">Complaints Query<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="rgb(0, 153, 255)"><path d="M479.79-96Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21Zm.21-396ZM192-216v-72h48v-240q0-87 53.5-153T432-763v-53q0-20 14-34t34-14q20 0 34 14t14 34v27q-11 21-17.5 45t-6.5 50q-6.21-.8-12.1-1.4-5.9-.6-11.9-.6-70 0-119 49t-49 119v240h336v-222q17 5 35.5 6t36.5-1v216.75h48V-216H192Zm419-395q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Z"/></svg></Link>
                                ):(
                                <Link to="/complaint-dashboard">Complaints Query<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="rgb(0,153,255)"><path d="M192-216v-72h48v-240q0-87 53.5-153T432-763v-53q0-20 14-34t34-14q20 0 34 14t14 34v53q85 16 138.5 82T720-528v240h48v72H192Zm288-276Zm-.21 396Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21ZM312-288h336v-240q0-70-49-119t-119-49q-70 0-119 49t-49 119v240Z"/></svg></Link>
                                )
                                }
                            </li>
                            <li>
                                <Link to="/employee-dashboard">
                                    Employee Requests
                                </Link>
                            </li>
                            <li>
                                <Link to="/reports">Reports</Link>
                            </li>
                            <li>
                                <Link to="/checklog">Check History</Link>
                            </li>
                            {/* <button
                            className="theme-btn"
                            onClick={toggleTheme}>
                                {darkMode ? "☀️ Light" : "🌙 Dark"}
                            </button> */}
                        </ul>
                    </div>
                    </>
                ): user.role === "security" ? (
                    <>
                        <div className="navbar-logo-security">
                            <h2>
                                <Link to="/security">
                                    <img src={heroImage} alt="Visitor Pass" />
                                    VisitorPass
                                </Link>
                            </h2>
                        </div>
                        <ul className="navbar-links-security">
                            <li>
                                <Link to="/security">Home</Link>
                            </li>
                            <li>
                                <Link to="/scan">Scan QR</Link>
                            </li>
                            <button 
                            className="profile-btn"
                            onClick={() => setShowProfile(true)}
                            >Profile
                            </button>
                        </ul>
                    </>
                ) : (
                    <>
                        <div className="navbar-logo-emp">
                            <h2>
                                <Link to="/employee-profile">
                                    <img src={heroImage} alt="Visitor Pass" />
                                    VisitorPass
                                </Link>
                            </h2>
                        </div>
                        <ul className="navbar-links-emp">
                            <li>
                                <Link to="/employee-profile">Home</Link>
                            </li>
                            <li>
                                <Link to="/emp-stats">Stats</Link>
                            </li>
                            <button 
                            className="profile-btn"
                            onClick={() => setShowProfile(true)}
                            >Profile
                            </button>
                            {/* <button
                            className="theme-btn"
                            onClick={toggleTheme}>
                                {darkMode ? "☀️ Light" : "🌙 Dark"}
                            </button> */}
                        </ul>
                    </>
                )
            }
        </nav>
    );
};

export default Navbar;