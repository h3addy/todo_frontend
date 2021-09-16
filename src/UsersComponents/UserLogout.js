import React, { useEffect } from 'react'

const UserLogout = (props) => {
    useEffect(() => {
        localStorage.clear()
        props.history.push("/")
    }, [props.history])
    
    return (
        <div>
            
        </div>
    )
}

export default UserLogout
