import React from 'react';
// Import your new hook
import useAuth from './hooks/useAuth';
// Import your new screen components
import AuthScreen from './components/AuthScreen';
import GameScreen from './components/GameScreen';
import CreateProfileScreen from './components/CreateProfileScreen'; 

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
        handleProfileCreate,
        handleGoogleSignIn 
    } = useAuth();

    // --- UPDATED LOGIC ---
    // We only show one loading screen until the hook tells us it's ready
    if (!isAuthReady) {
        return (
<div className="flex items-center justify-center min-h-screen">
    <h1 className="font-display text-5xl text-white">Loading...</h1>
</div>
        );
    }
    
    // When isAuthReady is true, we check the user
    // 1. No user exists
    if (!user) {
        return (
            <AuthScreen 
                onRegister={handleRegister} 
                onLogin={handleLogin} 
                onGoogleSignIn={handleGoogleSignIn}
                error={authError} 
            />
        );
    }

    // 2. User exists, but profile is NOT complete
    // We check userData (which we know is loaded)
    if (user && userData && userData.profileComplete === false) {
        return (
            <CreateProfileScreen 
                user={user} 
                onProfileCreate={handleProfileCreate} 
            />
        );
    }
    
    // 3. User exists AND profile IS complete
    if (user && userData && userData.profileComplete === true) {
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

    // Fallback (e.g., user exists but doc error)
    // This should rarely, if ever, be seen
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="font-display text-5xl text-white">An error occurred.</h1>
            <p className="text-white">{authError}</p>
        </div>
    );
}
