import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './UserLogin.module.css'


const UserLogin = (props) => {
    // const [ tokenPresent, setTokenPresent ] = useState(false)
    const loginError = useRef(false)
    const [ userLoginDetails, setUserLoginDetails ] = useState({
        username: "",
        password: "",
    })

    
    const handlChange = (e) => {
        const input = e.target
        const value = input.value
        setUserLoginDetails({...userLoginDetails, [input.name]: value})
    }

    async function loginUser (e) {
        e.preventDefault();
        // console.log(userLoginDetails)
        axios.get(`https://api-daily-todo-backend.herokuapp.com/api-user/login/${userLoginDetails.username}/`,{
            params: {
                password: userLoginDetails.password
            }
        })
        .then(response => {
            // console.log(response.data)
            loginError.current = false
            localStorage.setItem('user', JSON.stringify(response.data))
            props.history.push('/')
        })
        .catch(error =>  {
            console.log(error)
            loginError.current = true
            props.history.push('/login')
        })
        
    }


    return (
        <div className={styles.loginWrapper}>
            <form className={styles.loginFormClass} autoComplete="off">
                <p>Heyo &#129306;, Looks like you are not logged in.</p>
                <p>Please login to view to your tasks.</p>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={userLoginDetails.username} onChange={handlChange} required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={userLoginDetails.password} onChange={handlChange} required />
                <button onClick={loginUser}>Sign In</button>
                <Link to="/signup">Don't have account?</Link>
                <p style={{color:"red"}}>{loginError.current && "Username or Password is wrong. Please try again." }</p>
            </form>
        </div>
    )
}

export default UserLogin
