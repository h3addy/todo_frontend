import React, { useState, useEffect } from 'react'
import styles from './HomeComponent.module.css'
import todoimg1 from '../todo.jpg'
import todoimg2 from '../todo_sm.jpg'


const Home = (props) => {
    // const [accessToken, setAccessToken] = useState()
    const [ loggedUserDetails, setLoggedUserDetails ] = useState({})

    // console.log(loggedUserDetails)
    useEffect(() => {
        if (localStorage.length !== 0){
            setLoggedUserDetails(JSON.parse(localStorage.getItem('user')))
        } else {
            props.history.push('/login')
        }
    }, [props.history])
    
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.todoDescription}>
                <div className={styles.todoText}>
                    <h1>Hello {loggedUserDetails.first_name},</h1>
                    <p>
                        ToDo App is a kind of app that generally used 
                        to maintain our day-to-day tasks or list everything that 
                        we have to do, with the most important tasks at the top of 
                        the list, and the least important tasks at the bottom. 
                        It is helpful in planning our daily schedules. We can 
                        add more tasks at any time and delete a task that 
                        is completed. 
                    </p>
                    The app made is using following technologies:
                    <ul>
                        <li>Frontend: <strong>Reactjs</strong></li>
                        <li>Backend: <strong>Django and Rest Framework</strong></li>
                    </ul>
                </div>
                <div className={styles.todoImageContainer}>
                    <picture>
                        <source 
                            srcSet={todoimg1}
                            media="(max-width: 700px)"
                        />
                        <source 
                            srcSet={todoimg2}
                            media="(min-width: 701px) and (max-width: 1200px)"
                        />
                        <img 
                            src={todoimg1}
                            alt="Task List"
                        />
                    </picture>
                </div>
            </div>
            
        </div>
    )
}

export default Home
