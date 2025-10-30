import React, { useState } from 'react';
// Import all the components this screen uses
import NavBar from './NavBar';
import MemberList from './MemberList';
import GameArea from './GameArea';
import ProfileModal from './ProfileModal';

/**
 * GameScreen: The main application screen for logged-in users
 * (Copied from src/App.jsx, imports updated)
 */
const GameScreen = ({ user, userData, allUsers, onLogout, onProfileUpdate, onUpdateStats }) => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Make sure userData exists before trying to access its properties
    if (!userData) {
        // You might want to show a loading indicator here or return null
        return <div className="loading">Loading user data...</div>;
    }

    return (
        <div className="w-full mx-auto">
            <NavBar
                userData={userData}
                onLogout={onLogout}
                onEditProfile={() => setIsProfileModalOpen(true)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <MemberList allUsers={allUsers} currentUserId={user.uid} />
                </div>

                <GameArea
                    userData={userData}
                    onUpdateStats={onUpdateStats}
                />
            </div>

            {isProfileModalOpen && (
                <ProfileModal
                    currentName={userData.displayName}
                    onClose={() => setIsProfileModalOpen(false)}
                    onSave={onProfileUpdate}
                />
            )}
        </div>
    );
};

export default GameScreen;