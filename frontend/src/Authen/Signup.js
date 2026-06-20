import api from '../api'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState(null)
    const [showPass , setShowPass] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const response = await api.post('/users/signup',{name,email,password})
            console.log(response.data);
            localStorage.setItem(
                "user", 
                JSON.stringify(response.data)
            )
            navigate('/userlayout')
            
        }catch(error){
            setError(error.response.data.error)
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
            <h2>Signup</h2>
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
                <button type='submit' className='form-submit'>Submit </button>
            </form>
            {
                error && <p className='error'>{error}</p>
            }
            <p> Already have an account
                <span>
                <Link to='/login'>
                    <button type='button'className='last'>Login</button>
                </Link>
                </span>
            </p>
        </div>
    </div>
        </div>
    )
}

export default Signup