import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import DeleteConfirmation from "../BasicComponents/DeleteConfirmation.modal"
import styles from './ToDoList.module.css'


const ToDoList = (props) => {
    const [taskList, setTaskList] = useState([])
    // const [taskStatus, setTaskStatus] = useState()
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);

    const showDeleteModal = () => {
        setDeleteMessage(`Are you sure you want to delete all the tasks?`);
        setDisplayConfirmationModal(true);
    }
    
    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    }

    useEffect(() => {
        let active = true
        if (active) {
            if (localStorage.length === 0){
                props.history.push('/login')
            } else {
                const userID = JSON.parse(localStorage.getItem('user')).id
                const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
                
                axios.get(`https://api-daily-todo-backend.herokuapp.com/api-todos/${userID}`,{
                    params:{
                        accessToken: accessToken
                    }
                })
                .then((response) => setTaskList(response.data))
                .catch(error => {
                    console.log(error)
                })
            }
        }
        return () => {
            active = false
        }
    }, [props.history])


    const deleteAll = () => {
        const userID = JSON.parse(localStorage.getItem('user')).id
        const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
        
        axios.delete(`https://api-daily-todo-backend.herokuapp.com/api-todos/${userID}/`,{
                    params:{
                        accessToken: accessToken
                    }
                })
                .then(response => setTaskList([]))
                .catch(error => console.log(error))
        // console.log(userID, accessToken)
        hideConfirmationModal()
    }
    
    
    return (
        <div className={styles.todoListWrapper}>
            <div className={styles.topDiv}>
                <Link to='/user-tasks/add'>Add Task</Link>
                {taskList.length !== 0 && 
                <>
                    <h1>Your Tasks</h1>
                    <button onClick={showDeleteModal}>Delete All</button> 
                </> }
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={deleteAll} hideModal={hideConfirmationModal} message={deleteMessage} />
            </div>
            {taskList.length !== 0 ? <AllTaskList taskList={taskList}></AllTaskList> : <NoTask />}
        </div>
    )
}

const AllTaskList = ({ taskList }) => {
    const formatDate = (dateString) => {  
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <>
        <div className={styles.taskCardContainer}>
            { taskList.map((taskk)=>{
                const {id, title, task, completed, created_at, updated_at } = taskk;
                return (
                    <div key={id} className={styles.taskCard}>
                        <div className={styles.title}>
                            <Link to={{
                                pathname: "/task",
                                state: {taskk}
                            }}>{title}</Link>   
                        </div>
                        <div className={styles.updateDate}><h6>Added On: {formatDate(created_at)}</h6></div>
                        <div className={styles.taskDesc}><p>{task}</p></div>
                        { 
                            completed ?
                            <>
                                <div className={styles.statusGreen}><h4>Completed</h4></div>
                                <div className={styles.statusGreen}><h5>&#9989; On {formatDate(updated_at)}</h5></div>
                            </> :
                            <>
                                <div className={styles.statusRed}><h4>Not Completed</h4></div>
                            </>
                        }
                        
                    </div>
                    );
                })
            }
        </div>
        </>
    );
    }

const NoTask = () =>{
    return (
        <div className={styles.notaskCardContainer}>
            <h1>You have no tasks. Click "Add Task" to add new task</h1>
        </div>
    );
    
}

export default ToDoList
