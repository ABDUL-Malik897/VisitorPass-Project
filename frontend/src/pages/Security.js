import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../Hooks/useAuthContext";
import api from "../api";
import { useNavigate } from 'react-router-dom'


const Security = ({showProfile, setShowProfile}) => {

    const { user , dispatch } = useAuthContext()
    const navigate = useNavigate()
    const [stats , setStats] = useState({checkedIn : 0,checkedOut: 0,inside: 0})

    useEffect(() => {
        const fetchStats  = async () => {
            try {
                const response = await api.get('/checklog/stats')
                setStats(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchStats()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch({type : "LOGOUT"})
        navigate("/")
    }

    return (
        <div className='security-dashboard'>
            <div className='security-name'>
                <h1>Security Dashboard</h1>
                <p>Welcome, {user?.name}</p>
            </div>
            <div className='security-stats-box'>
            <div className='security-stats'>
                <div className='stat-box'>
                    <h3>Checked In</h3>
                    <h1>{stats.checkedIn}</h1>
                </div>
                <div className='stat-box'>
                    <h3>Checked Out</h3>
                    <h1>{stats.checkedOut}</h1>
                </div>
            </div>
                <div className='stat-box'>
                    <h3>Currently Inside</h3>
                    <h1>{stats.inside}</h1>
                </div>
            </div>   
            {
                showProfile && (
                    <div className='sidebar'>
                        <div className='profile'>
                            <button 
                            className='close-btn'
                            onClick={() => setShowProfile(false)}>
                                X
                            </button>
                            <h2>Profile</h2>
                            <hr />
                            <p><strong>Name :</strong>{user?.name}</p>
                            <p><strong>Email :</strong>{user?.email}</p>
                            <p><strong>Role :</strong>{user?.role}</p>
                        </div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )
            }
        </div>
    )
}

export default Security