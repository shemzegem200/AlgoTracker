import { useState } from 'react';
import './OpenBoard.css';



export default function OpenBoard(){

    const [board, setBoard] = useState(null);
    const [id, setId] = useState('');
    const [currentlySolving, setCurrentSolving] = useState(false);
    const [disableSearch, setDisableSearch] = useState(false);



    const retrieveBoardFromServer = async(ev) => {
        ev.preventDefault();
        if (id==='') return;
        //fetch the board from the server
        const response1 = await fetch(`http://localhost:4000/`+id);
        setId('');
        if (response1.ok){
            const response = await response1.json();
            setBoard(response.board);
        }
        else{
            //display an error message
            alert('Board not found');
        }
    }



    const SolveBoard = async () => {
        setDisableSearch(true);
        setCurrentSolving(true);
        const boardCopy = board.map(row => row.slice());
        await SolveBoardHelper(boardCopy);
        setCurrentSolving(false);
        await FinishAnimation();
    };


    const FinishAnimation = async () => {
        await new Promise(resolve => setTimeout(resolve, 50)); //like sleep(0.5) in python

        for (let i = 0; i < 17; i++) {
            for (let x= 0; x<9; x++){
                for (let y=0; y<9; y++){
                    if (x+y===i){
                        const cell = document.querySelector(`.row:nth-child(${x + 1}) .cell:nth-child(${y + 1})`);
        
                        if (i % 2 === 0) {
                            if (cell.classList.contains('light-blue-cell')) cell.classList.remove('light-blue-cell');
                        } else {
                            if (!cell.classList.contains('light-blue-cell')) cell.classList.add('light-blue-cell');
                        }
                    }
                }
            }
            await new Promise(resolve => setTimeout(resolve, 30)); //like sleep(0.5) in python
        }
        await new Promise(resolve => setTimeout(resolve, 50)); //like sleep(0.5) in python

        for (let i = 16; i >=0 ; i--) {
            for (let x= 8; x>=0; x--){
                for (let y=8; y>=0; y--){
                    if (x+y===i){
                        const cell = document.querySelector(`.row:nth-child(${x + 1}) .cell:nth-child(${y + 1})`);
        
                        if (i % 2 === 0) {
                            if (cell.classList.contains('light-blue-cell')) cell.classList.remove('light-blue-cell');
                        } else {
                            cell.classList.add('yellow-cell');
                        }
                    }
                }
            }
            await new Promise(resolve => setTimeout(resolve, 30)); //like sleep(0.5) in python
        }
        
    }
    


    const SolveBoardHelper = async(boardCopy) => {

        const newBoardCopy = boardCopy.map(row => row.slice()); // Create a new copy of the board
        const empty = findEmpty(newBoardCopy);
        if (!empty) {
            setBoard(newBoardCopy);
            //change color to light blue
            return true;  // All cells filled, sudoku solved
        } else {
            const [row, col] = empty;
            for (let num = 1; num <= 9; num++) {
                if (isValid(newBoardCopy, row, col, num.toString())) {
                    newBoardCopy[row][col] = num.toString();
                    setBoard(newBoardCopy);
                    //dynamically change color of the cell
                    const cell = document.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
                    cell.classList.add('light-blue-cell');

                    //wait for 0.1 seconds for visibility
                    await new Promise(resolve => setTimeout(resolve, 5)); //like sleep(0.5) in python


                    if (await SolveBoardHelper(newBoardCopy)) {
                        return true;
                    }
                    newBoardCopy[row][col] = '';  // Backtrack
                    setBoard(newBoardCopy);// Before returning from the function, remove the light-blue-cell class
                    cell.classList.remove('light-blue-cell');
                }
            }
            return false;
        }
    };

    const findEmpty= (boardCopy) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (boardCopy[i][j] === '') {
                    return [i, j];
                }
            }
        }
        return null;
    };

    const isValid = (boardCopy, row, col, num) => {
        for (let i = 0; i < 9; i++) {
            if (boardCopy[i][col] === num || boardCopy[row][i] === num) {
                return false;
            }
        }
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (boardCopy[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    }




    return (
        <div className='open-board-outer'>

            {!disableSearch && (
                <>
                <div className='top-text-instr'>Enter id of board</div>
                <div className="search-container">
                <form role="search" id="form" onSubmit={retrieveBoardFromServer}>
                    <input 
                        value={id}
                        onChange={ev => setId(ev.target.value)}
                        placeholder="Enter id.." 
                    />
                </form>
                </div>
                </>
            )}

            {disableSearch && (
                <br/>
            )}


            {board && (
                <>
                    <div className="board">
                        {board?.map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((cell, colIndex) => (
                                    <div className="cell" key={colIndex}>{cell}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <br/>
                    <div className={`solve-board-button ${disableSearch ? 'disabled' : ''}`} onClick={disableSearch ? null : SolveBoard} disabled={disableSearch}>
                        Solve Board
                    </div>
                </>
            )}

            
        </div>
    );
}
