import React, { useState } from 'react';
import Logo from '../assets/Logo.png'; // Use the logo

/**
 * CreateProfileScreen: A one-time screen for new users
 * to complete their profile after registration.
 */
const CreateProfileScreen = ({ user, onProfileCreate }) => {
    const [displayName, setDisplayName] = useState('');
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState(''); // This state now holds the dropdown value
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simple validation for the dropdown
        if (!grade) {
            setError("Please select your grade or status.");
            return;
        }
        
        setIsSaving(true);
        setError('');

        const profileData = {
            displayName,
            school,
            grade
        };
        
        const saveError = await onProfileCreate(profileData);
        
        if (saveError) {
            setError(saveError);
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto flex min-h-screen items-center">
            <div className="card w-full p-8">
                <img src={Logo} alt="Brain Blast Logo" className="w-auto h-20 mx-auto mb-6" />
                {/* UPDATED: Used .text-primary class */}
                <h2 className="font-display text-3xl text-primary text-center mb-6">Create Your Profile</h2>
                <p className="text-gray-600 text-center mb-6">Welcome! Let's get your profile set up to continue.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="display-name" className="block text-sm font-medium text-gray-700 text-left mb-1">Display Name *</label>
                        <input 
                            type="text" id="display-name" 
                            placeholder="Your public name" 
                            className="input-field" required 
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="school" className="block text-sm font-medium text-gray-700 text-left mb-1">School (Optional)</label>
                        <input 
                            type="text" id="school" 
                            placeholder="e.g., Royal College" 
                            className="input-field" 
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </div>

                    {/* --- UPDATED: This is now a dropdown --- */}
                    <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 text-left mb-1">Grade / Status *</label>
                        <select
                            id="grade"
                            className="input-field"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select your status...</option>
                            <option value="Grade 6">Grade 6</option>
                            <option value="Grade 7">Grade 7</option>
                            <option value="Grade 8">Grade 8</option>
                            <option value="Grade 9">Grade 9</option>
                            <option value="Grade 10">Grade 10</option>
                            <option value="Grade 11 (O/L)">Grade 11 (O/L)</option>
                            <option value="Grade 12 (A/L)">Grade 12 (A/L)</option>
                            <option value="Grade 13 (A/L)">Grade 13 (A/L)</option>
                            <option value="After O/L">After O/L</option>
                            <option value="After A/L">After A/L</option>
                            <option value="University Student">University Student</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {/* --- End of dropdown --- */}

                    <p className="text-red-500 text-sm h-4">{error}</p>
                    
                    <button type="submit" disabled={isSaving} className="btn btn-primary w-full !mt-6">
                        {isSaving ? 'Saving...' : 'Save and Start Playing'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfileScreen;