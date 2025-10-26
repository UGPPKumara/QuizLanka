import React from 'react';

/**
 * NavBar: Top bar with profile info
 * (Copied from src/App.jsx)
 */
const NavBar = ({ userData, onLogout, onEditProfile }) => {
    const firstLetter = userData.displayName ? userData.displayName[0].toUpperCase() : 'A';
    const avatarUrl = `https://placehold.co/100x100/2193b0/FFFFFF?text=${firstLetter}`;
    
    return (
        <nav className="card w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4">
            <div className="flex items-center gap-4">
                <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full border-4 border-white shadow-md" />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">{userData.displayName}</h2>
                    <p className="text-teal-600 font-semibold">
                        <span>Score: {userData.score}</span> | <span>Level: {userData.currentLevel}</span>
                    </p>
                </div>
            </div>
            <div className="flex gap-3">
                <button onClick={onEditProfile} className="btn btn-ghost text-sm">Edit Profile</button>
                <button onClick={onLogout} className="btn btn-danger text-sm">Logout</button>
            </div>
        </nav>
    );
};

export default NavBar;