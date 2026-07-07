import React, { useEffect, useState } from 'react'
import { useVisitorsContext } from '../Hooks/useVisitorContext'
import { useNavigate } from 'react-router-dom'
import { useComplaintContext } from '../Hooks/useComplaintContext'
import '../index.css'
import ExportVisitors from "../utils/ExportVisitor";
import {Chart as ChartJS,ArcElement,CategoryScale,LinearScale,BarElement,PointElement,LineElement,Tooltip,Legend} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import api from "../api";


ChartJS.register(
ArcElement,
CategoryScale,
LinearScale,
BarElement,
PointElement,
LineElement,
Tooltip,
Legend
);

const Report = () => {
const { visitors } = useVisitorsContext() 
const navigate = useNavigate()
const { complaints } = useComplaintContext()
const [employees, setEmployees] = useState([]);
const [logs, setLogs] = useState([]);

// const visitors = await api.get("/visitors");
// const complaints = await api.get("/complaints");
// const employees = await api.get("/employee");
// const logs = await api.get("/checklog");

useEffect(() => {
    const fetchData = async () => {
        try {
            const emp_response = await api.get("/employee");
            const logResponse = await api.get("/checklog");
            setEmployees(emp_response.data);
            setLogs(logResponse.data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, []);

const emp_status = {
    Pending: 0,
    Approved: 0,
    Rejected: 0
};

employees.forEach((employee) => {
    emp_status[employee.status]++;
});

const employeeChartData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
        {
            label: "Employees",
            data: [
                emp_status.Pending,
                emp_status.Approved,
                emp_status.Rejected
            ],
            borderWidth: 1
        }
    ]
};

const today = new Date().toISOString().split("T")[0]
const week = new Date()
week.setDate(week.getDate() - 7)

const purposeCount = {}
visitors?.forEach(visitor => {
    const purpose = visitor.Purpose
    if (purposeCount[purpose]) {
        purposeCount[purpose] ++
    } else {
        purposeCount[purpose] = 1
    }
    })

const complaint_types = {}
complaints?.forEach(complaint => {
    const complaintType = complaint.ComplaintType
    if (complaint_types[complaintType]) {
        complaint_types[complaintType] ++
    } else {
        complaint_types[complaintType] = 1
    }
    })


const handleback = () => {
    navigate("/admin")
}

const mostCommonPurpose = Object.keys(purposeCount).reduce((a,b) => purposeCount[a] > purposeCount[b] ? a:b,Object.keys(purposeCount)[0]) || "N/A"
const mostCommonType = Object.keys(complaint_types).reduce((a,b) => complaint_types[a] > complaint_types[b] ? a:b,Object.keys(complaint_types)[0]) || "N/A"

const  todayVisitor = visitors?.filter(v => v.VisitDate === today).length || 0;
const weeklyVisitors = visitors?.filter(v => new Date(v.createdAt) >= week).length || 0;
const approved = visitors?.filter(v => v.Status === "Approved").length || 0;
const pending = visitors?.filter(v => v.Status === "Pending").length || 0;
const rejected = visitors?.filter(v => v.Status === "Rejected").length || 0;

const visitorChart = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
        {
            label: "Visitors",
            data: [approved, pending, rejected]
        }
    ]
};
const complaintChartData = {
    labels: Object.keys(complaint_types),
    datasets: [
        {
            label: "Complaints",
            data: Object.values(complaint_types),
            borderWidth: 1
        }
    ]
};
const purposeChartData = {
    labels: Object.keys(purposeCount),
    datasets: [
        {
            label: "Visitors",
            data: Object.values(purposeCount),
            borderWidth: 1
        }
    ]
};
const logCounts = {};
logs.forEach((log) => {
    const date = new Date(log.createdAt).toLocaleDateString();

    if (logCounts[date]) {
        logCounts[date]++;
    } else {
        logCounts[date] = 1;
    }
});
const logChartData = {
    labels: Object.keys(logCounts),
    datasets: [
        {
            label: "Visitor Check-ins",
            data: Object.values(logCounts),
            fill: false
        }
    ]
};

    return ( 
    <>
    <div className='report'>
        <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button>
    <div className='report-card'>
        <h2>Report</h2>
        <p>
        Today's Visitors : {todayVisitor}
        </p>
        <p>
        Total Visitors This Week : {weeklyVisitors}
        </p>
        <p>
        Most Common Visit Purpose : {mostCommonPurpose}
        </p>
        <p>
        Most Common Complaints Type : {mostCommonType}
        </p>
        <button onClick={() => ExportVisitors(visitors)} className="export-btn">
        Export Visitors (.xlsx)
        </button>
    </div>
    <div className="charts-container">

    <div className="chart-card" style={{ width: "400px", margin: "30px auto" }}>
        <h3>Visitor Status</h3>
        <Pie data={visitorChart} />
    </div>

    <div className="chart-card" style={{ width: "400px", margin: "30px auto" }}>
        <h3>Visitor Purpose</h3>
        <Pie data={purposeChartData} />
    </div>
    <div className="chart-card" style={{ width: "400px", margin: "30px auto" }}>
        <h3>Complaint Types</h3>
        <Bar data={complaintChartData} />
    </div>
    <div className="chart-card" style={{ width: "400px", margin: "30px auto" }}>
        <h3>Employee Status</h3>
        <Bar data={employeeChartData} />
    </div>
    <div className="chart-card" style={{ width: "400px", margin: "30px auto" }}>
        <h3>Visitor Check-in Trend</h3>
        <Line data={logChartData} />
    </div>
    </div>
    </div>
    </>
    )
}

export default Report