/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect, act } from "react";
import { v4 as uuid } from "uuid"
import AlertMessage from "./Alert";

export default function UpdateTask({ selectedTask }) {

    const [showAlert, setShowAlert] = useState(false);

    const [alertMessage, setAlertMessage] = useState({
        message: "",
        type: "",
    });

    const [taskDetails, setTaskDetails] = useState({
        id: selectedTask.id,
        name:selectedTask.name,
        description: selectedTask.description,
        subtasks: selectedTask.subtasks,
        currentStatus: activeBoard.columns[0].name,
    })

    const darkModal = {
        background: "#2b2c37",
        color: "#f8f9fa",
    }

    const lightModal = {
        background: "#fff",
        color: "#2b2c37",
    }

    const handleCloseTaskModal = (e) => {
        if (e.target === e.currentTarget) {
            setShowTaskModal(false)
        }
    }

    const handleAddNewSubtask = () => {
        setTaskDetails({...taskDetails, subtasks: [...taskDetails.subtasks, {}]})
    }

    const handleRemoveSubtask = (index) => {
        const newSubtasks = taskDetails.subtasks.filter((subtask, i) => i !== index);
        setTaskDetails({...taskDetails, subtasks: newSubtasks})
    }

    const handleCreateTask = () => {
        if (!taskDetails.name || !taskDetails.description) {
            setAlertMessage({message: "Please fill in all fields", type: "error"})
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
          return;
        }

        if (taskDetails.subtasks.some((subtask) => Object.keys(subtask).length == 0)) {
            setAlertMessage({message: "Please fill in all subtask fields", type: "error"})
            console.log(taskDetails.subtasks)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
          return;
        }
      
        const updatedBoards = boards.map((board) => {
          if (board.id === activeBoard.id) {
            // Update the columns array immutably
            const updatedColumns = board.columns.map((column) => {
              if (column.name === taskDetails.currentStatus) {
                return {
                  ...column, 
                  tasks: [...column.tasks, taskDetails]  // Add new task immutably
                };
              }
              return column;
            });
            
            // Return the updated board with new columns array
            return { ...board, columns: updatedColumns };
          }
          return board;  // Return the board unchanged if it's not the active one
        });
      
        // Set the updated boards state
        setBoards([...updatedBoards]);  // Ensure a new reference to the array is created
        setShowTaskModal(false);  // Close the modal
        console.log(boards)
      };
      
      

    return (
        <div className="modal-overlay" onClick={handleCloseTaskModal}>
            {showAlert && <AlertMessage message={alertMessage.message} type={alertMessage.type} />}
            <div className="modal-content tasks-modal" style={theme == "dark" ? darkModal : lightModal}>
                <h2>Add new Task</h2>
                <form>
                    <div className={theme == "dark" ? "input-box dark" : "input-box light"}>
                        <label htmlFor="task-name">Task Name</label>
                        <input type="text" id="task-name" value={taskDetails.name} onChange={(e) => setTaskDetails({...taskDetails, name:e.target.value})}/>
                    </div>
                    <div className={theme == "dark" ? "input-box dark" : "input-box light"}>
                        <label htmlFor="board-name">Description</label>
                        <textarea name="task-description" id="task-description" value={taskDetails.description} onChange={(e) => setTaskDetails({...taskDetails, description:e.target.value})}></textarea>
                    </div>
                    <h3>Subtasks</h3>
                    {taskDetails.subtasks.map((subtask, index) => (
                        <div key={index} className={theme == "dark" ? "input-box columns dark" : "input-box columns light"}>
                            <input type="text" id={`task-${index}`} value={subtask.name} 
                                onChange={(e) => { 
                                    const updatedSubtasks = {...taskDetails.subtasks}
                                    updatedSubtasks[index] = {...updatedSubtasks[index], name: e.target.value}
                                    setTaskDetails({...taskDetails, subtasks: updatedSubtasks})
                                }}/>
                            <span onClick={() => handleRemoveSubtask(index)}>&times;</span>
                        </div>
                    ))}
                    <button className="btn add-column" type="button" onClick={handleAddNewSubtask}>Add new Subtask</button>

                    <h3>Current Status</h3>
                    <select name="column" id="column" className={theme=="dark" ? "task-column dark" : "task-column light"} onChange={(e) => setTaskDetails({...taskDetails, currentStatus: e.target.value})}>
                        {activeBoard.columns.map((column) => {
                            return (
                                <option key={column.id} value={column.name}>{column.name}</option>
                            )
                        })}
                    </select>
                    <button className="btn create-board" type="button" onClick={handleCreateTask}>Create Task</button>
                </form>
            </div>
        </div>
    )
}
