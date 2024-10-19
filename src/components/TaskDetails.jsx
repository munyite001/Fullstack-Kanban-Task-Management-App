/* eslint-disable react/prop-types */
import { useState } from "react";

export default function TaskDetails({ setShowTaskDetailsModal, theme, selectedTask, boards, setBoards }) {


    const [modifiedTask, setModifiedTask] = useState(selectedTask);

    const [showTaskControls, setShowTaskControls] = useState(false);

    const darkModal = {
        background: "#2b2c37",
        color: "#f8f9fa",
    }

    const lightModal = {
        background: "#fff",
        color: "#2b2c37",
    }

    const darkSubtask = {
        background: "#20212c",
        color: "#f8f9fa",
    }

    const lightSubtask = {
        background: "#f4f7fd",
        color: "#2b2c37",
    }

    const handleCloseModal = (e) => {
        if (e.target == e.currentTarget) {
            setShowTaskDetailsModal(false);
        }
    }

    const handleCheckBoxChange = (index) => {
        // Create a copy of the subtasks and update the completed status for the specific subtask
        const updatedSubtasks = modifiedTask.subtasks.map((subtask, i) => {
            return i === index ? {...subtask, completed: !subtask.completed} : subtask
        })

        setModifiedTask({...modifiedTask, subtasks: updatedSubtasks});

        // Update the boards state with the new subtask status
        const updatedBoards = boards.map((board) => {
            const updatedColumns = board.columns.map((column) => {
                const updatedTasks = column.tasks.map((task) => {
                    if (task.id === modifiedTask.id) {
                        return {...task, subtasks: updatedSubtasks}
                    }
                    return task
                })

                return {...column, tasks: updatedTasks}
            })

            return {...board, columns: updatedColumns}
        })

        setBoards(updatedBoards);

    }

    const handleToggleTaskControls = () => {
        setShowTaskControls(!showTaskControls);
    }

    const handleDeleteTask = () => {
        const deleteTask = window.confirm(`Are you sure you want to delete this task ${modifiedTask.name}?`);

        if (deleteTask) {
            // Update the boards state with the new task status
            const updatedBoards = boards.map((board) => {
                const updatedColumns = board.columns.map((column) => {
                    const updatedTasks = column.tasks.filter((task) => task.id !== modifiedTask.id);
                    return {...column, tasks: updatedTasks}
                })

                return {...board, columns: updatedColumns}
            })

            setBoards(updatedBoards);
            setShowTaskDetailsModal(false);
        }
    }

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            {selectedTask &&
                <div className="modal-content task-details" style={theme == "dark" ? darkModal : lightModal}>
                    {showTaskControls && 
                        <div className="task-controls">
                            <button type="button" className="btn-2">Edit Task</button>
                            <button type="button" className="btn-2" onClick={() => handleDeleteTask(selectedTask)}>Delete Task</button>
                        </div>
                    }
                    <h2>
                        {modifiedTask.name}
                        <i className="fa-solid fa-ellipsis-vertical" onClick={handleToggleTaskControls}></i>
                    </h2>
                    <h4>Subtasks ({modifiedTask.subtasks.filter((subtask) => subtask.completed).length} of {selectedTask.subtasks.length})</h4>
                    <ul className="sub-tasks">
                        {modifiedTask.subtasks.map((subtask, index) => (
                            <li key={subtask.id} className={subtask.completed ? "completed" : ""} style={theme == "dark" ? darkSubtask : lightSubtask}>
                                <input 
                                    className={subtask.completed ? "completed" : ""}
                                    type="checkbox"
                                    name={`subtask-${subtask.id}`} 
                                    id={`subtask-${subtask.id}`} 
                                    checked={subtask.completed}
                                    onChange={() => handleCheckBoxChange(index)}/>
                                <label htmlFor={`subtask-${subtask.id}`}>{subtask.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}