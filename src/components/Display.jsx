import { useState, useRef } from "react"
import Draggable from "react-draggable"

/* eslint-disable react/prop-types */
export default function Display({ activeBoard, showSideBar, theme, setShowTaskModal, boards, setBoards, setActiveBoard, setShowUpdateBoardModal, setSelectedTask, setShowTaskDetailsModal }) {

    const [showBoardControls, setShowBoardControls] = useState(false)

    //  State to track if the user is dragging a task
    const [isDragging, setIsDragging] = useState(false)


    // Create a ref to store references to all column elements
    const columnRefs = useRef([]);

    const darkColorDisplay = {
        background: "#20212c",
        color: "f8f9fa",
    }

    const lightColorDisplay = {
        background: "#f4f7fd",
        color: "#2b2c37",
    }


    const darkDisplayInfo = {
        background: "#2b2c37",
        color: "#f8f9fa",
    }

    const lightDisplayInfo = {
        background: "#fff",
        color: "#2b2c37",
    }

    const darkTask = {
        background: "#2b2c37",
        color: "#f8f9fa",
    }

    const lightTask = {
        background: "#fff",
        color: "#2b2c37",
    }

    const handleToggleBoardControls = () => {
        setShowBoardControls(!showBoardControls)
    }

    const handleCloseControls = (e) => {
        if (e.target == e.currentTarget) {
            setShowBoardControls(false)
        }
    }

    const handleDeleteBoard = () => {
        const deleteBoard = window.confirm(`Are you sure you want to delete this board ${activeBoard.name}?`);

        if (deleteBoard) {
            const newBoards = boards.filter((board) => board.id !== activeBoard.id);
            setBoards(newBoards);
            setActiveBoard(newBoards[newBoards.length - 1]);
        }
    }

    const handleEditBoard = () => {
        setShowUpdateBoardModal(true);
        setShowBoardControls(false);
    }

    const handleSelectTask = (task) => {
        if (!isDragging) {
            setSelectedTask(task);
            setShowTaskDetailsModal(true);
        }
    }

    const handleDragStart = () => {
        console.log("Dragging started")
        setIsDragging(true);
    };


    const handleDragStop = (e, task, sourceColumnId) => {
        console.log("Dragging stopped");
        setIsDragging(false);

        const data = { x: e.clientX, y: e.clientY };

        // Loop through each column and check if the task was dropped within its bounds
        columnRefs.current.forEach((columnRef, index) => {
            if (columnRef) {
                const rect = columnRef.getBoundingClientRect();
                if (data.x > rect.left && data.x < rect.right && data.y > rect.top && data.y < rect.bottom) {
                    const targetColumnId = activeBoard.columns[index].id;

                    if (targetColumnId !== sourceColumnId) {
                        const updatedBoards = [...boards];

                        // Find the source and target columns
                        const sourceColumn = activeBoard.columns.find((column) => column.id === sourceColumnId);
                        const targetColumn = activeBoard.columns.find((column) => column.id === targetColumnId);

                        // Remove the task from the source column and add it to the target column
                        sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== task.id);
                        targetColumn.tasks.push(task);

                        // Update the boards
                        setBoards(updatedBoards);
                    }
                }
            }
        });
    };

    return (
        <div className={showSideBar ? "display sidebar-open" : "display"} style={theme == "dark" ? darkColorDisplay : lightColorDisplay}>
            {showBoardControls &&
                <div className="controls-modal" onClick={(e) => handleCloseControls(e)}>
                    <div className="controls-modal-content">
                        <button type="button" className="btn-2" onClick={handleEditBoard}>Edit Board</button>
                        <button type="button" className="btn-2" onClick={handleDeleteBoard}>Delete Board</button>
                    </div>
                </div>
            }
            <div className="display-info"style={theme == "dark" ? darkDisplayInfo : lightDisplayInfo}>
                <h2>{activeBoard.name}</h2>
                <div className="display-info-controls">
                    <button type="button" className="btn" onClick={() => setShowTaskModal(true)}>Add New Task</button>
                    <i className="fa-solid fa-ellipsis-vertical" onClick={handleToggleBoardControls}></i>
                </div>
            </div>
            <div className="board-contents">
                <ul className="tasks">
                    {activeBoard.columns.map((column, index) => {
                        return (
                            <li key={column.id} className="column" ref={(el) => (columnRefs.current[index] = el)}>
                                <h3>{column.name} ( {column.tasks.length} )</h3>
                                <ul>
                                    {column.tasks.map((task) => {
                                        return (
                                            <Draggable key={task.id} onStart={handleDragStart} onStop={(e) => handleDragStop(e, task, column.id)}>
                                                <li className="task" style={theme == 'dark' ? darkTask : lightTask} onClick={() => handleSelectTask(task)}>
                                                    <h4>{task.name}</h4>
                                                    <p className="sub-tasks">{(task.subtasks.filter((subtask) => subtask.completed)).length || 0} of {(task.subtasks.length) || 0} subtasks</p>
                                                </li>
                                            </Draggable>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                    <li className="column add-column" style={theme == 'dark' ? darkTask : lightTask} onClick={handleEditBoard}>
                        <span>Add New Column <i className="fa-solid fa-plus"></i></span> 
                    </li>    
                </ul>        
            </div>
        </div>
    )

}