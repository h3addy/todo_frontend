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
            <ToDoForm taskToUpdate={taskDetails} buttonType="add"></ToDoForm>
        </div>
    )
}

export default ToDoAdd

