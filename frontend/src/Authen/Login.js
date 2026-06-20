import api from "../api"
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../Hooks/useAuthContext'


const Login = () => {

    const {dispatch} = useAuthContext()



    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState(null)
    const [showPass , setShowPass] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async(e) =>{
        e.preventDefault()

        try{
            const response = await api.post("/users/login",{
                email,
                password
            })
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            )

            dispatch({
                type:"LOGIN",
                payload: response.data
            })

            navigate("/userlayout")
            
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
        <div className='login'>
            <h2>Login</h2>
            <span>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</span>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type='email' 
                placeholder='Enter Your Registered Email'
                className='email'
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                />
                <label>Password</label>
                <div>
                <input type={showPass ? "text" : 'password'} 
                placeholder='*******'
                className='pass'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="button"
                className='see-hide'
                    onClick={() => setShowPass(!showPass)}>
                        {showPass ? "Hide" : "See"}
                    </button>
                </div>
                <button type='submit' className='form-submit'>submit</button>
            </form>
            {
                error && <p className='error'>{error}</p>
            }
            <p> Don't Have an account
                <span>
                <Link to='/signup'>
                    <button type='button' className='last'>Signup</button>
                </Link>
                </span>
            </p>
        </div>
    </div>
        </div>
    )
}

export default Login