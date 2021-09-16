import React from 'react'
import ToDoForm from './ToDoForm'

const ToDoTaskDetail = (props) => {

    return (
        <div>
            <ToDoForm taskToUpdate={props.location.state} buttonType="update" history={props.history}></ToDoForm>
        </div>
    )
}

export default ToDoTaskDetail
