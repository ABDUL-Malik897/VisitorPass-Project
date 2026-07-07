import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuthContext } from "../Hooks/useAuthContext";

const EmpStats = () => {

    const { user } = useAuthContext();
    

    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        checkedIn: 0,
        checkedOut: 0
    });

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

        <div className="emp-stats-2">
            <h1>My Visitor Statistics</h1>
            <div className="emp-stats-boxs">
                <div className="stat-boxs">
                    <h3>Total Visitors</h3>
                    <h1>{stats.total}</h1>
                </div>
                <div className="stat-boxs">
                    <h3>Pending</h3>
                    <h1>{stats.pending}</h1>
                </div>
                <div className="stat-boxs">
                    <h3>Approved</h3>
                    <h1>{stats.approved}</h1>
                </div>
                <div className="stat-boxs">
                    <h3>Rejected</h3>
                    <h1>{stats.rejected}</h1>
                </div>
                <div className="stat-boxs">
                    <h3>Checked In</h3>
                    <h1>{stats.checkedIn}</h1>
                </div>
                <div className="stat-boxs">
                    <h3>Checked Out</h3>
                    <h1>{stats.checkedOut}</h1>
                </div>
            </div>
        </div>
    )
};

export default EmpStats;