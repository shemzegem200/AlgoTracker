import { useState } from "react";
import './Board.css';
import Popup from './Popup.js';
import {useNavigate } from 'react-router-dom';


export default function CreateBoard(){

    const [board, setBoard] = useState(Array.from(Array(9), () => Array(9).fill('')));
    const [showPopup, setShowPopup] = useState(false);
    const [boardId, setBoardId] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (row, col, val) => {
        const newBoard = [...board];
        newBoard[row][col] = val;
        setBoard(newBoard);
        console.log(board);
    };

    //close the popup
    const handleClosePopup = () => {
        setShowPopup(false);
        // Navigate to index page or perform any other action
        navigate("/");// Navigate to the index page
    };


    //function to check if sudoku is valid. if valid, it adds it to database and displays the id of board
    const CheckValid = async () => {
        const obj = { "param1": board };
        const response1 = await fetch('http://localhost:4000/run-python-script', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' }
        });
    
        if (!response1.ok) {
            // There is some error... show popup
            alert("An unknown error occurred while creating board... Please try again later");
        } else {
            try {
                const response = await response1.json(); // Parse response body as JSON
                console.log(response.result);
    
                if (response.result === "False") {
                    alert("Couldn't create... Invalid board");
                } else {
                    // Submit the board to the database and show success popup
                    const response2 = await fetch('http://localhost:4000/create-board', {
                        method: 'POST',
                        body: JSON.stringify(obj),
                        headers: { 'Content-Type': 'application/json' }
                    });
    
                    if (!response2.ok) {
                        // There is some error while creating
                        alert("An unknown error occurred while creating board... Please try again later");
                    } else {
                        const data = await response2.json(); // Parse response body as JSON
                        console.log('success.\n', data);
                        // Show success popup
                        // alert("Board created successfully");
                        setBoardId(data._id); // Assuming _id is the board ID
                        setShowPopup(true);
                    }
                }
            } catch (error) {
                // Handle parsing error
                console.error('Error:', error);
            }
        }
    }
    



    return (
        <div className="board-container">
            <div className="board-id-text">Fill in the below board</div>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                type="text"
                                maxLength="1"
                                value={cell}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                className="cell"
                                onKeyPress={(e) => {
                                    // Allow only numbers
                                    const regex = /^[0-9\b]+$/;
                                    if (!regex.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="save-board-button" onClick={CheckValid}>Save Board</div>
            {showPopup && <Popup boardId={boardId} onClose={handleClosePopup} />}
        </div>
      );
}
