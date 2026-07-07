import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'


const EmpSignup = () => {

    const navigate = useNavigate()
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [phone ,setPhone] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')
    const [success , setSuccess] = useState('')    
    const [showPass , setShowPass] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("/employee/request",{
                name, email, phone, password
            })
            setSuccess(response.data.message)
            setName("")
            setEmail("")
            setPhone("")
            setPassword('')
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong")
        }
    }
    const handleback = () => {
        navigate("/")
    }

    return (
            <div className='page'>
                <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button> 
                <div className='center'>
            <div className='signup'>
                <h2>Employee-Signup</h2>
                <span>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</span>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type='text' 
                    placeholder='Enter Your Name'
                    value={name}
                    className='signup-name'
                    onChange={(e) =>setName(e.target.value)}
                    />
                    <label>Email</label>
                    <input type='email' 
                    placeholder='Email you want to Register with...'
                    value={email}
                    className='email'
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <label>Phone Number</label>
                    <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phone}
                    className='signup-name'
                    onChange={(e) => setPhone(e.target.value)}
                    />
                    <label> Password</label>
                    <div>
                        <input type={showPass ? "text" : 'password'} 
                        className='pass'
                        placeholder='*******'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                        <button type="button"
                        className='see-hide'
                        onClick={() => setShowPass(!showPass)}>
                            {showPass ? "Hide" : "See"}
                        </button>
                    </div>
                    <button type='submit' className='form-submit'>Submit</button>
                </form>
                {
                    error && <p className='error'>{error}</p>
                }
                {
                    success && <p style={{color : "green"}}>{success}</p>
                }
                <p> Already Approved
                    <span>
                    <Link to='/employee-login'>
                        <button type='button'className='last'>Login</button>
                    </Link>
                    </span>
                </p>
            </div>
        </div>
            </div>
        )     
}

export default EmpSignup    