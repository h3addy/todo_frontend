import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styles from './UserDetails.module.css'
import { Link } from 'react-router-dom'

const UserDetails = (props) => {
    const active = useRef(true)
    const userUpdated = useRef(0);
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        spotifyID: ''
    });

    // console.log(userDetails)
    useEffect(() => {
        // console.log(JSON.parse(localStorage.getItem('user')).accessToken !== '')
        if (active.current){
            if (localStorage.length !== 0){
                setUserDetails(JSON.parse(localStorage.getItem('user')))
            } else {
                props.history.push('/login')
            }
        }
        
        return () => {
            active.current = false;
        }
    }, [props.history])

    const handleChange = e => {
        const input = e.target
        const value = input.value
        setUserDetails({...userDetails, [input.name]: value})
    }

    const handleUpdate = e => {
        e.preventDefault();
        
        const body = {...userDetails, accessToken: JSON.parse(localStorage.getItem('user')).accessToken}
        
        axios.put(`https://api-daily-todo-backend.herokuapp.com/api-users/${userDetails.username}/`, body)
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            userUpdated.current = response.status
            setUserDetails(response.data)
        })
        .catch((error) => {
            userUpdated.current = error.response.status
            setUserDetails(JSON.parse(localStorage.getItem('user')))
        })
    }

    return (
        <div className={styles.userdetailsWrapper}>
            <form className={styles.userdetailsFormClass} autoComplete="off">
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" defaultValue= {userDetails.first_name} onChange={handleChange}/>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" defaultValue={userDetails.last_name} onChange={handleChange}/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" defaultValue={userDetails.username} onChange={handleChange}/>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" defaultValue={userDetails.email} onChange={handleChange}/>
                <label htmlFor="spotifyID">Spotify ID</label>
                <input type="text" name="spotifyID" defaultValue={userDetails.spotifyID} onChange={handleChange}/>
                <button onClick={handleUpdate}>Update</button>
                <Link to="/logout">Logout</Link>
                <p>
                    { userUpdated.current === 200 && "Details Updated"}
                    { userUpdated.current === 400 && "Error: Data not updated. Please refresh the page."}
                </p>
            </form>
        </div>
    )
}

export default UserDetails
