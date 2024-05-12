import React from 'react';
import './Popup.css'; // Import CSS file for styling
import { useState } from 'react';

const Popup = ({ boardId, onClose }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(boardId)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Board Created Successfully!</h2>
                <p>This is the only time you can view this id, so take a note of it</p>
                <p>The ID of the created board is: <span>{boardId}</span></p>
                <button className="copy-button" onClick={copyToClipboard}>
                    {copied ? 'Copied!' : 'Copy ID'}
                    {copied && <span className="tick-icon">&#10004;</span>}
                </button>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default Popup;
