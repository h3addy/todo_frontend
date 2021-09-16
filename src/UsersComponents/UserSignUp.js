import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './UserSignUp.module.css'

const UserSignUp = (props) => {
    const signupError = useRef(false)
    const [ userDetails, setUserDetails ] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password:"",
        password1: "",
        password2: ""
    })

    const handlChange = (e) => {
        const input = e.target
        const value = input.value
        setUserDetails({...userDetails, [input.name]: value})
    }

    async function createUser (e) {
        e.preventDefault();
        let dataBody = userDetails
        if (dataBody.password1 === dataBody.password2){
            dataBody = {...dataBody, password: userDetails.password1}
        }
        // console.log(dataBody)
        axios.post(`https://api-daily-todo-backend.herokuapp.com/api-users/`, dataBody)
        .then(response => {
            // console.log(response)
            signupError.current = false
            props.history.push('/login')
        })
        .catch(error =>  {
            console.log(error)
            signupError.current = true
            props.history.push('/signup')
        })
        
    }

    return (
        <div className={styles.signupWrapper}>
            <form className={styles.signupFormClass} autoComplete="off">
                <p>Welcome to ToDo App &#128526;</p>
                <p>Please register to start using ToDo App.</p>
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name" value={userDetails.first_name} onChange={handlChange} required/>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" name="last_name" value={userDetails.last_name} onChange={handlChange} required />
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={userDetails.username} onChange={handlChange} required />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={userDetails.email} onChange={handlChange} required />
                <label htmlFor="password1">Password</label>
                <input type="password" id="password1" name="password1" value={userDetails.password1} onChange={handlChange} required />
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" id="password2" name="password2" value={userDetails.password2} onChange={handlChange} required />
                <button onClick={createUser}>Sign Up</button>
                <Link to="/login">Already have account?</Link>
                <p style={{color:"red"}}>{ signupError.current && "Username or Email is missing or already registered. Try with new one."}</p>
            </form>
        </div>
    )
}

export default UserSignUp
