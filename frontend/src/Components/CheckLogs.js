import React, { useEffect, useState } from 'react'
import api from "../api"
import { useNavigate } from 'react-router-dom'


const CheckLogs = () => {

    const [logs , setLogs] = useState([])
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const logs_per_page = 6;
    const navigate = useNavigate()


    useEffect(() => {

        const fetchLogs =  async (req ,res) => {
            const response = await api.get('/checklog/logs')
            setLogs(response.data)
        }
        fetchLogs()
    }, [])

    const filter_logs = logs.filter((log) => {
        const query = search.toLowerCase();

        return (
            log.Name?.toLowerCase().includes(query) ||
            log.Email?.toLowerCase().includes(query) ||
            log.Status?.toLowerCase().includes(query) ||
            log.CheckType?.toLowerCase().includes(query)
        );
    });

    const last_log_index = currentPage * logs_per_page;
    const firstLogIndex = last_log_index - logs_per_page;
    const currentLogs =filter_logs.slice(firstLogIndex,last_log_index);
    const totalPages = Math.ceil(filter_logs.length /logs_per_page);

    const handleback = () => {
        navigate("/admin")
    }

    return (
        <>
            <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button> 

        <div className='checklog-table'>
        <div className="search-container">
                <h2>Visitor Check History</h2>
                <input
                type="text"
                placeholder="Search Logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                />
            </div>
        <div className='table-scroll'>
            
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentLogs.map(log => (
                            <tr key={log._id}>
                                <td>{log.Visitor?.Name}</td>
                                <td>
                                    {
                                        log.CheckIn ? new Date(log.CheckIn).toLocaleString() : `&mdash`
                                    }
                                </td>
                                <td>
                                    {
                                        log.CheckOut ? new Date(log.CheckOut).toLocaleString() : `&mdash`
                                    }
                                </td>
                                <td>{log.Status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
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

export default CheckLogs