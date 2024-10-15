import { useState, useEffect } from "react";

export default function CreateBoardModal() {
    const [boardDetails, setBoardDetails] = useState({
        name: "",
        columns: [
            {
                name: "To Do",
                tasks: []
            },
            {
                name: "In Progress",
                tasks: []
            },
            {
                name: "Completed",
                tasks: []
            }
        ]
    });

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create a new board</h2>
                <form>
                    <div className="input-box">
                        <label htmlFor="board-name">Board Name</label>
                        <input type="text" id="board-name" />
                    </div>
                    <h3>Board Columns</h3>
                    {boardDetails.columns.map((column, index) => (
                        <div key={index} className="input-box">
                            <input type="text" id={`column-${index}`} value={column.name}/>
                        </div>
                    ))}
                    <button type="submit">Add new Column</button>
                    <button type="submit">Create Board</button>
                </form>
            </div>
        </div>
    )
}