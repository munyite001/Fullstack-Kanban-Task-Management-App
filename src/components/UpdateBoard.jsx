/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

export default function UpdateBoard({ setShowUpdateBoardModal, setBoards, boards, theme, activeBoard, setActiveBoard }) {

    const [boardDetails, setBoardDetails] = useState({
        name: activeBoard.name,
        columns: activeBoard.columns
    });

    const darkModal = {
        background: "#2b2c37",
        color: "#f8f9fa",
    }

    const lightModal = {
        background: "#fff",
        color: "#2b2c37",
    }

    const darkInput = {
        color: "#fff",
    }

    const lightInput = {
        color: "#2b2c37",
    }

    const handleCloseModal = (e) => {
        if (e.target == e.currentTarget) {
            setShowUpdateBoardModal(false);
        }
    }

    const handleRemoveColumn = (index) => {
        return () => {
            const newColumns = boardDetails.columns.filter((column, i) => i !== index);
            setBoardDetails({ ...boardDetails, columns: newColumns });
        }
    }

    const handleColumnChange = (e, index) => {
        const updatedColumns = boardDetails.columns.map((column, i) => {
            if (i === index) {
                return { ...column, name: e.target.value };
            }
            return column

        });

        //  Update the state with new columns
        setBoardDetails({ ...boardDetails, columns: updatedColumns });
    }

    const handleAddNewColumn = () => {
        const updatedColumns = boardDetails.columns.concat({
            id: uuid().slice(0, 8),
            name:"",
            tasks: []
        })

        setBoardDetails({ ...boardDetails, columns: updatedColumns });
    }

    const handleUpdateBoard = () => {
        if ( boardDetails.name == "" ) {
            console.log("Board Name Can't be empty")
            return;
        }

        const updatedBoards = boards.map(board => {
            if (board.id === activeBoard.id) {
                return { ...board, name: boardDetails.name, columns: boardDetails.columns }
            }
            return board;
        });

        setBoards(updatedBoards);
        setActiveBoard(updatedBoards.find(board => board.id === activeBoard.id));
        setShowUpdateBoardModal(false);

    }

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" style={theme == "dark" ? darkModal : lightModal}>
                <h2>Update board</h2>
                <form>
                    <div className={theme == "dark" ? "input-box dark" : "input-box light"}>
                        <label htmlFor="board-name">Board Name</label>
                        <input type="text" id="board-name" value={boardDetails.name} onChange={(e) => setBoardDetails({...boardDetails, name:e.target.value})}/>
                    </div>
                    <h3>Board Columns</h3>
                    {boardDetails.columns.map((column, index) => (
                        <div key={index} className={theme == "dark" ? "input-box columns dark" : "input-box columns light"}>
                            <input type="text" id={`column-${index}`} value={column.name} onChange={(e) => handleColumnChange(e, index)}/>
                            <span onClick={handleRemoveColumn(index)}>&times;</span>
                        </div>
                    ))}
                    <button className="btn add-column" type="button" onClick={handleAddNewColumn}>Add new Column</button>
                    <button className="btn create-board" type="button" onClick={handleUpdateBoard}>Save Board</button>
                </form>
            </div>
        </div>
    )
}