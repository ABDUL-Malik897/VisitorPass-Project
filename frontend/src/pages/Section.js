import React  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Image from '../Image/Screenshot 2026-04-23 000604.png';


const Section = () => {
    const navigate = useNavigate()

    const employeeportal = () => {
        navigate("/employee-portal")
    }
    return (
        <div className='sections'>
            <div className='main-page'id='home'>
            <div className='a'>
            <h1>Secure Visitor Pass Management System</h1>
            <p>Manage your Visitor digitally with a simple and secure system. <br />
            Generate QR-based visitor passes, receive approvals,track complaints, and manage visitor records securely.
            </p>
            <Link to="/signup"><button>Get Started</button></Link>
            </div>
            <div>
                <img src={Image} alt='Visitor Pass'/>
            </div>
            </div>
            <div className='section-1'>
                <Link to="/login"><button className='b'>Admin Login</button></Link>
                <Link to="/login">
                    <button className='c'>Visitor Registration</button>
                </Link>
                <button className='b'onClick={employeeportal}>Employee Portal</button>
            </div>
            <div className='section-2' id='features'>
                <h2>Feature</h2>
                <div className='cards'>
                <div className='feature-cards'>
                    <h4>Easy Registration</h4>
                    <p>Visitor can register online or at the gate.</p>
                </div>
                <div className='feature-cards'>
                    <h4>QR Code Based Passes</h4>
                    <p>Generate QR code passes for the quick and secure check-ins</p>
                </div>
                <div className='feature-cards'>
                    <h4>Real-time Tracking</h4>
                    <p>Monitor visitor check-ins and check-outs live.</p>
                </div>
                <div className='feature-cards'>
                    <h4>Secure & Reliable</h4>
                    <p>Keep visitor data safe with state-of-art security</p>
                </div>
                </div>
            </div>
            <div className='section-3' id='how-it-works'>
                <h2>How It Works</h2>
                <div className='steps'>
                    <div>
                        <p><span>1.</span>Register Account</p>
                    </div>
                    <div>
                        {/* <h3>2</h3> */}
                        <p><span>2.</span>Submit Visitor Request</p>
                    </div>
                    <div>
                        {/* <h3>3</h3> */}
                        <p><span>3.</span>Admin Approval</p>
                    </div>
                    <div>
                        {/* <h3>4</h3> */}
                        <p><span>4.</span>Receive QR Code</p>
                    </div>
                    <div>
                        {/* <h3>5</h3> */}
                        <p><span>5.</span>Verify at Entry Gate</p>
                    </div>
                </div>
            </div>
            <div className='section-4'>
                <h2> Why Choose VisitorPass ?</h2>
                <ul>
                <li>Fast QR Generation</li>
                <li>Secure Authentication</li>
                <li>Email Notifications</li>
                <li>Complaint Resolution</li>
                <li>Real-Time Visitor Tracking</li>
                </ul>
            </div>
            <div className='section-5'>
                
                    <h2>Stats</h2>
                    <div className="stats">
                    <div>
                        <h3>100+</h3>
                        <p>Visitors Managed</p>
                    </div>
                    <div>
                        <h3>50+</h3>
                        <p>QR Passes Generated</p>
                    </div>
                    <div>
                        <h3>25+</h3>
                        <p>Complaints Resolved</p>
                    </div>
                    <div>
                        <h3>99%</h3>
                    <p>System Reliability</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section