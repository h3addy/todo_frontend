import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import DeleteConfirmation from "../BasicComponents/DeleteConfirmation.modal"
import styles from './ToDoForm.module.css'

const ToDoForm = ({ taskToUpdate, buttonType, history }) => {

    const initialState = {
        title: "",
        task: "",
        completed: false,
        user: ""
    }
    const taskAdded = useRef(0);
    const active = useRef(true);
    const [taskDetails, setTaskDetails ] = useState(initialState)
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const deleteMessage = useRef(null);

    const showDeleteModal = (e) => {
        e.preventDefault()
        deleteMessage.current = `Are you sure you want to delete this task?`;
        setDisplayConfirmationModal(true);
    }
    
    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    }
    
    // console.log(taskDetails)

    useEffect(() => {
        // console.log(active.current)
        if (localStorage.length === 0){
            history.push('/login')
        }
        if (active.current){
            setTaskDetails({...taskToUpdate.taskk})
        }
        return () => {
            active.current = false
        }
    }, [taskToUpdate.taskk])

    const handlChange = (e) => {
        const input = e.target
        const value = input.type === 'checkbox' ? input.checked : input.value
        setTaskDetails({ ...taskDetails, [input.name]: value})
    }

    const handlError = () => {
        Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = input.type === 'checkbox' ? false : '')
            );
        setTaskDetails({...initialState})
    }

    const addTask= (e) => {
        e.preventDefault();
        const userID = JSON.parse(localStorage.getItem('user')).id
        const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
        
        axios.post(`https://api-daily-todo-backend.herokuapp.com/api-todos/${userID}/`, taskDetails, {
                params:{
                    accessToken: accessToken
                }
            })
        .then(response => {
            taskAdded.current = response.status
            // console.log(history)
            // setTaskDetails(response.data)
            history.push("/user-tasks")
        })
        .catch(error =>  {
            taskAdded.current = error.response.status
            handlError()
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const userID = JSON.parse(localStorage.getItem('user')).id
        const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
        fetch(`https://api-daily-todo-backend.herokuapp.com/api-todos/${userID}/${taskDetails.id}/`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            
            body: JSON.stringify({...taskDetails, accessToken: accessToken})
        })
        .then((response) => {
            taskAdded.current = response.status
            // console.log(history)
            // setTaskDetails({...taskDetails})
            history.push("/user-tasks")
        })
        .catch(error => {
            taskAdded.current = error.response.status
            setTaskDetails({...taskDetails})
        });

    }

    const handleDelete = () => {
        // e.preventDefault();
        const userID = JSON.parse(localStorage.getItem('user')).id
        const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
        fetch(`https://api-daily-todo-backend.herokuapp.com/api-todos/${userID}/${taskDetails.id}/`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',

            body: JSON.stringify({...taskDetails, accessToken: accessToken})
        })
        .then((response) => {
            history.push("/user-tasks")
        })
        .catch(e => {
            console.log(e)
        });
        hideConfirmationModal()
        // window.location.href = "http://localhost:3000/users"
    }


    return (
        <div className={styles.todoformWrapper}>
            <form className={styles.todoFormClass} autoComplete="off">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" defaultValue={taskDetails.title !== '' ? taskDetails.title : ''} onChange={handlChange} required/>
                <label htmlFor="task">Task:</label>
                <input type="text" name="task" defaultValue={taskDetails.task} onChange={handlChange} required/>
                { buttonType === "update" &&
                    <>
                        <label htmlFor="completed">Completed:</label>
                        <input type="checkbox" name="completed" onChange={handlChange} checked={taskDetails.completed}/>
                    </>
                }
                { buttonType === "update" && <div><button onClick={handleUpdate}>Update</button> <button onClick={showDeleteModal}>Delete</button></div> }
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={handleDelete} hideModal={hideConfirmationModal} message={deleteMessage.current} />
                { buttonType === "add" && <button onClick={addTask}>Add Task</button> } 
                <p style={{color: "red"}}>
                    { (taskAdded.current === 200 && buttonType === "update") && "Task Updated" }
                    { (taskAdded.current === 201 && buttonType === "add") && "Task Added" }
                    { (taskAdded.current === 400 && buttonType === "update")&& "Error: Data not updated. Please refresh the page."}
                    { (taskAdded.current === 400 && buttonType === "add")&& "Error: Task not created. Please try again."}
                </p>
            </form> 
        </div>
    )
}

export default ToDoForm
