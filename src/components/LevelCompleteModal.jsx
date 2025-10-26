import React from 'react';

/**
 * LevelCompleteModal: Modal for level/game complete
 * (Copied from src/App.jsx)
 */
const LevelCompleteModal = ({ title, message, buttonText, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="card modal-content text-center max-w-md w-full z-10">
                <h2 className="font-display text-4xl text-yellow-500 mb-4">{title}</h2>
                <p className="text-lg text-gray-700 mb-8">{message}</p>
                <button onClick={onClose} className="btn btn-primary w-full">{buttonText}</button>
            </div>
        </div>
    );
};

export default LevelCompleteModal;