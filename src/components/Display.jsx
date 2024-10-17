import { useState } from "react"

/* eslint-disable react/prop-types */
export default function Display({ board, showSideBar, theme, setShowTaskModal }) {

    const [showBoardControls, setShowBoardControls] = useState(false)

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

    return (
        <div className={showSideBar ? "display sidebar-open" : "display"} style={theme == "dark" ? darkColorDisplay : lightColorDisplay}>
            {showBoardControls &&
                <div className="controls-modal" onClick={(e) => handleCloseControls(e)}>
                    <div className="controls-modal-content">
                        <button type="button" className="btn-2">Edit Board</button>
                        <button type="button" className="btn-2">Delete Board</button>
                    </div>
                </div>
            }
            <div className="display-info"style={theme == "dark" ? darkDisplayInfo : lightDisplayInfo}>
                <h2>{board.name}</h2>
                <div className="display-info-controls">
                    <button type="button" className="btn" onClick={() => setShowTaskModal(true)}>Add New Task</button>
                    <i className="fa-solid fa-ellipsis-vertical" onClick={handleToggleBoardControls}></i>
                </div>
            </div>
            <div className="board-contents">
                <ul className="tasks">
                    {board.columns.map((column) => {
                        return (
                            <li key={column.id} className="column">
                                <h3>{column.name} ( {column.tasks.length} )</h3>
                                <ul>
                                    {column.tasks.map((task) => {
                                        return (
                                            <li key={task.id} className="task" style={theme == 'dark' ? darkTask : lightTask}>
                                                <h4>{task.name}</h4>
                                                <p className="sub-tasks">{(task.subtasks.filter((subtask) => subtask.completed)).length || 0} of {(task.subtasks.length) || 0} subtasks</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}    
                </ul>        
            </div>
        </div>
    )

}