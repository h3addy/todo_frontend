import React from 'react'
import ToDoForm from './ToDoForm'

const ToDoAdd = (props) => {
    const taskDetails = {
        title: "",
        task: "",
        completed: false,
        user: ""
    }

    return (
        <div>
            <ToDoForm taskToUpdate={taskDetails} buttonType="add" history={props.history}></ToDoForm>
        </div>
    )
}

export default ToDoAdd

