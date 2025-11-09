import React, { useState } from 'react';

/**
 * ProfileModal: Modal for editing display name
 * (Copied from src/App.jsx)
 */
const ProfileModal = ({ currentName, onClose, onSave }) => {
    const [name, setName] = useState(currentName);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');
        const saveError = await onSave(name);
        if (saveError) {
            setError(saveError);
            setIsSaving(false);
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="card modal-content text-center max-w-md w-full z-10">
                {/* UPDATED: Used .text-primary class */}
                <h2 className="font-display text-4xl text-primary mb-6">Edit Your Profile</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label htmlFor="profile-name-input" className="block text-sm font-medium text-gray-700 text-left mb-1">Display Name</label>
                        <input 
                            type="text" id="profile-name-input" 
                            className="input-field" required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <p className="text-red-500 text-sm h-4">{error}</p>
                    <div className="flex gap-4 !mt-8">
                        <button type="button" onClick={onClose} className="btn btn-ghost w-1/2">Cancel</button>
                        <button type="submit" disabled={isSaving} className="btn btn-primary w-1/2">
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;