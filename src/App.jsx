import React from 'react';
// Import your new hook
import useAuth from './hooks/useAuth';
// Import your new screen components
import AuthScreen from './components/AuthScreen';
import GameScreen from './components/GameScreen';

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
        handleGoogleSignIn // <-- Get the new Google handler
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
    if (!user || !userData) {
        return (
            <AuthScreen 
                onRegister={handleRegister} 
                onLogin={handleLogin} 
                onGoogleSignIn={handleGoogleSignIn} // <-- Pass it to the component
                error={authError} 
            />
        );
    }

    // Logged In State
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