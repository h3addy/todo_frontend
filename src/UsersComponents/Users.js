import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Users = () => {
    const [userList, setUserList] = useState([])

            
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api-users/")
        .then((response) => response.json())
        .then((data) => setUserList(data))
    },[])


    return (
        <div>
            <ul>
            {userList.map( (user)=>{
                const { id, username } = user;
                return <li key={id}><Link to={{
                                    pathname: "/profile",
                                    state: { user: user }
                                }}>{username}</Link></li>;
            } )}
            </ul>
            <p style={{marginTop: "2rem"}}><Link to='/users/add'>Add User</Link></p>
        </div>
    )
}

export default Users
