import React from 'react';
// Import your new hook
import useAuth from './hooks/useAuth';
// Import your new screen components
import AuthScreen from './components/AuthScreen';
import GameScreen from './components/GameScreen';
import CreateProfileScreen from './components/CreateProfileScreen'; // <-- IMPORT NEW SCREEN

// --- 4. MAIN APP COMPONENT ---
export default function App() {
    // Get everything from your custom hook
    const {
        user,
        userData,
        allUsers,
        isAuthReady,
        authError,
        handleRegister,
        handleLogin,
        handleLogout,
        handleProfileUpdate,
        updateUserStatsInFirestore,
        handleProfileCreate // <-- GET NEW FUNCTION
    } = useAuth();

    // Loading State
    if (!isAuthReady) {
        return (
<div className="flex items-center justify-center min-h-screen">
    <h1 className="font-display text-5xl text-white">Loading...</h1>
</div>
        );
    }
    
    // Logged Out State
    if (!user) {
        return (
            <AuthScreen 
                onRegister={handleRegister} 
                onLogin={handleLogin} 
                // onGoogleSignIn prop removed
                error={authError} 
            />
        );
    }

    // --- NEW LOGIC ---
    // User is logged in, but userData might be loading or incomplete
    if (userData) {
        // If profile is NOT complete, show CreateProfileScreen
        if (userData.profileComplete === false) {
            return (
                <CreateProfileScreen 
                    user={user} 
                    onProfileCreate={handleProfileCreate} 
                />
            );
        }
        
        // If profile IS complete, show GameScreen
        if (userData.profileComplete === true) {
            return (
                <GameScreen 
                    user={user}
                    userData={userData}
                    allUsers={allUsers}
                    onLogout={handleLogout}
                    onProfileUpdate={handleProfileUpdate}
                    onUpdateStats={updateUserStatsInFirestore}
                />
            );
        }
    }

    // Fallback: User exists, but userData is still null (loading)
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="font-display text-5xl text-white">Loading Profile...</h1>
        </div>
    );
}