import createIcon from '../icons/create.png';
import './IndexPage.css';
import {Link} from 'react-router-dom';


export default function IndexPage(){
    return (
        <div className="index-contents">
            <div className='header'>
                <br/>
                <div className='header-text'>Welcome to Algo-Tracker! Choose any one of the options below...</div>
                <br/>
                <br/>
            </div>

            <div className="buttons">

                <Link to="/open" className="open-board">
                        <div className="texts">Open Board</div>
                        <div className='img-container'><img src="https://static.thenounproject.com/png/196595-200.png" alt="Open"  className='img-open'/></div>
                        <div className="message">Choose this option if you have a board id</div>
                </Link>

                <Link to="/create" className="create-board">
                        <div className="texts">Create Board</div>
                        <div className='img-container'><img src={createIcon} alt="Create" className='img-create'/></div>
                        <div className="message">Choose this option if you need to create a new board</div>
                </Link>
            </div>
            <br/>
            <br/>
        </div>
            
    );
}