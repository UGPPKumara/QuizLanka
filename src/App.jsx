import React, { useState, useEffect, useMemo } from 'react';

// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithCustomToken
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    setDoc,
    updateDoc,
    onSnapshot, 
    collection, 
    query,
    setLogLevel
} from "firebase/firestore";

// --- 0. FIREBASE CONFIG ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const usersCollectionPath = `artifacts/${appId}/public/data/users`;
let app, auth, db;

try {
    const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    setLogLevel('Debug');
} catch (error) {
    console.error("Error initializing Firebase (check config):", error);
}

// --- 1. GAME DATA ---
const gameData = [
    {
        levelName: "Level 1: Sri Lankan Animals",
        questions: [
            { question: "What is the national bird of Sri Lanka?", answer: "Sri Lanka Junglefowl", options: ["Peacock", "Sri Lanka Junglefowl", "Myna", "Kingfisher"], image: "https://placehold.co/400x300/96E072/333?text=Sri+Lanka+Junglefowl" },
            { question: "Which large mammal is seen in parks like Yala and Udawalawe?", answer: "Elephant", options: ["Rhino", "Hippo", "Elephant", "Buffalo"], image: "https://placehold.co/400x300/72BBE0/333?text=Asian+Elephant" },
            { question: "What spotted cat is the apex predator in Sri Lanka?", answer: "Leopard", options: ["Tiger", "Leopard", "Cheetah", "Lion"], image: "https://placehold.co/400x300/E0D072/333?text=Sri+Lankan+Leopard" },
            { question: "Which primate is known for its purple face and white beard?", answer: "Purple-faced Langur", options: ["Toque Macaque", "Grey Langur", "Purple-faced Langur", "Lorris"], image: "https://placehold.co/400x300/A972E0/333?text=Purple-faced+Langur" },
            { question: "What is the small, native deer species?", answer: "Spotted Deer", options: ["Sambar", "Barking Deer", "Mouse Deer", "Spotted Deer"], image: "https://placehold.co/400x300/E0A072/333?text=Spotted+Deer+(Chital)" },
            { question: "Which marine mammal can be seen off the coast of Mirissa?", answer: "Blue Whale", options: ["Dolphin", "Blue Whale", "Shark", "Seal"], image: "https://placehold.co/400x300/728EE0/333?text=Blue+Whale" },
            { question: "What is the common name for the 'Rilawa' monkey?", answer: "Toque Macaque", options: ["Toque Macaque", "Baboon", "Gorilla", "Orangutan"], image: "https://placehold.co/400x300/E0B672/333?text=Toque+Macaque" },
            { question: "Which large bear is native to Sri Lanka and eats termites?", answer: "Sloth Bear", options: ["Grizzly Bear", "Black Bear", "Sloth Bear", "Sun Bear"], image: "https://placehold.co/400x300/8C72E0/333?text=Sloth+Bear" },
            { question: "What colorful bird has a long tail and is often seen in pairs?", answer: "Peacock", options: ["Hornbill", "Parrot", "Peacock", "Eagle"], image: "https://placehold.co/400x300/72E0C6/333?text=Peacock" },
            { question: "What reptile is the largest in Sri Lanka?", answer: "Saltwater Crocodile", options: ["Python", "Cobra", "Water Monitor", "Saltwater Crocodile"], image: "https://placehold.co/400x300/78E072/333?text=Saltwater+Crocodile" }
        ]
    },
    {
        levelName: "Level 2: Sri Lankan Places & Food",
        questions: [
            { question: "What is the ancient rock fortress in the Central Province?", answer: "Sigiriya", options: ["Sigiriya", "Anuradhapura", "Polonnaruwa", "Kandy"], image: "https://placehold.co/400x300/E0A072/333?text=Sigiriya+Rock" },
            { question: "What is the 'Temple of the Tooth' called in Sinhala?", answer: "Dalada Maligawa", options: ["Ruwanwelisaya", "Dalada Maligawa", "Jetavanaramaya", "Thuparamaya"], image: "https://placehold.co/400x300/E07272/333?text=Dalada+Maligawa" },
            { question: "What is the main city in the hill country, known for its lake?", answer: "Kandy", options: ["Nuwara Eliya", "Kandy", "Ella", "Badulla"], image: "https://placehold.co/400x300/72E08E/333?text=Kandy+Lake" },
            { question: "What is the popular stringy, noodle-like breakfast food?", answer: "String Hoppers", options: ["Hoppers", "Pittu", "Roti", "String Hoppers"], image: "https://placehold.co/400x300/DDE072/333?text=String+Hoppers" },
            { question: "Which coastal town is famous for its fort built by the Dutch?", answer: "Galle", options: ["Matara", "Galle", "Colombo", "Trincomalee"], image: "https://placehold.co/400x300/72BBE0/333?text=Galle+Fort" },
            { question: "What is the name of the popular bowl-shaped pancake?", answer: "Hoppers", options: ["Hoppers", "Roti", "Paratha", "Dosa"], image: "https://placehold.co/400x300/E0D072/333?text=Hoppers+(Aappa)" },
            { question: "What is the highest mountain in Sri Lanka?", answer: "Piduruthalagala", options: ["Adams Peak", "Knuckles", "Piduruthalagala", "Haputale"], image: "httpsD://placehold.co/400x300/72E0C6/333?text=Piduruthalagala" },
            { question: "What spicy condiment is made with coconut and chili?", answer: "Pol Sambol", options: ["Lunu Miris", "Seeni Sambol", "Pol Sambol", "Katta Sambol"], image: "https://placehold.co/400x300/E07A72/333?text=Pol+Sambol" },
            { question: "Which national park is most famous for leopard sightings?", answer: "Yala", options: ["Wilpattu", "Yala", "Udawalawe", "Minneriya"], image: "https://placehold.co/400x300/A0E072/333?text=Yala+National+Park" },
            { question: "What is the name of the train journey famous for its scenic views?", answer: "Kandy to Ella", options: ["Colombo to Galle", "Kandy to Ella", "Colombo to Jaffna", "Anuradhapura to Polonnaruwa"], image: "https://placehold.co/400x300/72C6E0/333?text=Kandy+to+Ella+Train" }
        ]
    }
    // Add more levels here...
];


// --- 2. CUSTOM AUTH HOOK ---
// Manages all Firebase auth and data state
function useAuth() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [authError, setAuthError] = useState("");

    useEffect(() => {
        let userDocUnsubscribe = null;
        let memberListUnsubscribe = null;

        // Auto-sign-in with token if available
        (async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await signInWithCustomToken(auth, __initial_auth_token);
                }
            } catch (error) {
                console.error("Error during initial sign-in:", error);
                setAuthError("Error signing in. Please try again.");
            } finally {
                setIsAuthReady(true);
            }
        })();
        
        const authUnsubscribe = onAuthStateChanged(auth, (user) => {
            // Stop any previous listeners
            if (userDocUnsubscribe) userDocUnsubscribe();
            if (memberListUnsubscribe) memberListUnsubscribe();
            
            if (user) {
                setUser(user);
                
                // Listen to this user's doc
                const userDocRef = doc(db, usersCollectionPath, user.uid);
                userDocUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.warn("User doc not found!");
                    }
                });

                // Listen to ALL users for the member list
                const q = query(collection(db, usersCollectionPath));
                memberListUnsubscribe = onSnapshot(q, (querySnapshot) => {
                    const members = [];
                    querySnapshot.forEach((doc) => {
                        members.push(doc.data());
                    });
                    setAllUsers(members);
                }, (error) => {
                    console.error("Error listening to member list:", error);
                });

            } else {
                setUser(null);
                setUserData(null);
                setAllUsers([]);
            }
            
            if (!isAuthReady) setIsAuthReady(true);
        });

        // Cleanup
        return () => {
            authUnsubscribe();
            if (userDocUnsubscribe) userDocUnsubscribe();
            if (memberListUnsubscribe) memberListUnsubscribe();
        };
    }, [isAuthReady]); // Dependency ensures this runs once

    const handleRegister = async (displayName, email, password) => {
        if (displayName.length < 3) {
            setAuthError("Display Name must be at least 3 characters.");
            return;
        }
        setAuthError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Create user profile document in Firestore
            const userDocRef = doc(db, usersCollectionPath, user.uid);
            await setDoc(userDocRef, {
                userId: user.uid,
                displayName: displayName,
                score: 0,
                currentLevel: 1 // Start at level 1
            });
        } catch (error) {
            console.error("Registration Error:", error);
            setAuthError(error.message);
        }
    };

    const handleLogin = async (email, password) => {
        setAuthError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login Error:", error);
            setAuthError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };
    
    const handleProfileUpdate = async (newDisplayName) => {
        if (!user) return;
        if (newDisplayName.length < 3) {
            return "Name must be at least 3 characters.";
        }
        
        try {
            const userDocRef = doc(db, usersCollectionPath, user.uid);
            await updateDoc(userDocRef, {
                displayName: newDisplayName
            });
            return null; // Success
        } catch (error) {
            console.error("Error updating profile:", error);
            return "Failed to save. Please try again.";
        }
    };
    
    const updateUserStatsInFirestore = async (dataToUpdate) => {
        if (!user) return;
        const userDocRef = doc(db, usersCollectionPath, user.uid);
        try {
            await updateDoc(userDocRef, dataToUpdate);
        } catch (error) {
            console.error("Error updating user stats:", error);
        }
    };

    return {
        user,
        userData,
        allUsers,
        isAuthReady,
        authError,
        handleRegister,
        handleLogin,
        handleLogout,
        handleProfileUpdate,
        updateUserStatsInFirestore
    };
}


// --- 3. HELPER COMPONENTS ---

/**
 * AuthScreen: Login and Register Forms
 */
const AuthScreen = ({ onRegister, onLogin, error }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoginView) {
            onLogin(email, password);
        } else {
            onRegister(displayName, email, password);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="card text-center">
                <h1 className="font-display text-5xl text-teal-600 mb-6">Lanka Genius Quiz</h1>
                
                <div className="flex mb-4 border-b border-gray-200">
                    <button 
                        className={`auth-tab ${isLoginView ? 'auth-tab-active' : 'auth-tab-inactive'}`}
                        onClick={() => setIsLoginView(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`auth-tab ${!isLoginView ? 'auth-tab-active' : 'auth-tab-inactive'}`}
                        onClick={() => setIsLoginView(false)}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginView && (
                        <div>
                            <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 text-left mb-1">Display Name</label>
                            <input 
                                type="text" id="register-name" 
                                placeholder="e.g., Nimal" 
                                className="input-field" required 
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-1">Email</label>
                        <input 
                            type="email" id="email" 
                            placeholder="you@email.com" 
                            className="input-field" required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left mb-1">Password</label>
                        <input 
                            type="password" id="password" 
                            placeholder="••••••••" 
                            className="input-field" required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="text-red-500 text-sm h-4">{error}</p>
                    <button type="submit" className="btn btn-primary w-full !mt-6">
                        {isLoginView ? 'Login' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

/**
 * NavBar: Top bar with profile info
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

/**
 * MemberList: Sidebar with live scores
 */
const MemberList = ({ allUsers, currentUserId }) => {
    // Sort the list once, memoize it
    const sortedMembers = useMemo(() => {
        return [...allUsers].sort((a, b) => b.score - a.score);
    }, [allUsers]);

    return (
        <div className="card flex-1">
            <h2 className="font-display text-3xl text-teal-600 mb-4">Live Competition</h2>
            <div className="space-y-3 max-h-96 lg:max-h-[500px] overflow-y-auto pr-2">
                {sortedMembers.length === 0 && <p className="text-gray-500">No members yet...</p>}
                {sortedMembers.map((member, index) => (
                    <div 
                        key={member.userId} 
                        className={`flex items-center justify-between p-2 rounded-lg ${member.userId === currentUserId ? 'bg-teal-100' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-600 w-6 text-right">{index + 1}.</span>
                            <div>
                                <p className="font-semibold text-gray-800">{member.displayName}</p>
                                <p className="text-xs text-gray-500">Level {member.currentLevel}</p>
                            </div>
                        </div>
                        <span className="font-bold text-teal-600">{member.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * GameArea: The core quiz component
 */
const GameArea = ({ userData, onUpdateStats }) => {
    // Game State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentLevelProgress, setCurrentLevelProgress] = useState(0);
    const [scoreAtLevelStart, setScoreAtLevelStart] = useState(0);
    const [gameState, setGameState] = useState('text-input'); // 'text-input', 'mc-input', 'feedback'
    const [textAnswer, setTextAnswer] = useState('');
    const [feedback, setFeedback] = useState({ message: '', points: 0, correct: false, image: '' });
    
    // Modal State
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', buttonText: '' });

    // Derived State
    const currentLevelIndex = Math.max(0, (userData.currentLevel || 1) - 1);
    const currentLevel = gameData[currentLevelIndex % gameData.length]; // Modulo to prevent crash
    const currentQuestion = currentLevel.questions[currentQuestionIndex];

    // Effect to reset game when level changes
    useEffect(() => {
        // This effect triggers when `userData.currentLevel` changes (from Firestore)
        const newLevelIndex = Math.max(0, (userData.currentLevel || 1) - 1);
        const levelData = gameData[newLevelIndex % gameData.length];
        
        setCurrentQuestionIndex(0);
        setCurrentLevelProgress(0);
        setScoreAtLevelStart(userData.score || 0);
        setGameState('text-input');
        
        // Update DB that user is on this level (for member list)
        onUpdateStats({ currentLevel: userData.currentLevel });
        
    }, [userData.currentLevel, userData.score]); // Rerun when level or score changes
    
    const handleTextSubmit = () => {
        const userAnswer = textAnswer.trim().toLowerCase();
        const correctAnswer = currentQuestion.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            handleCorrectAnswer(true); // true = first try
        } else {
            setGameState('mc-input');
        }
        setTextAnswer('');
    };

    const handleMcSubmit = (selectedOption) => {
        const correctAnswer = currentQuestion.answer;
        if (selectedOption === correctAnswer) {
            handleCorrectAnswer(false); // false = not first try
        } else {
            handleIncorrectAnswer();
        }
    };

    const handleCorrectAnswer = (isFirstTry) => {
        const pointsGained = isFirstTry ? 10 : 5;
        
        setFeedback({
            message: `Correct! +${pointsGained} Points!`,
            points: pointsGained,
            correct: true,
            image: currentQuestion.image
        });
        setGameState('feedback');
        setCurrentLevelProgress(prev => prev + 1);
        onUpdateStats({ score: userData.score + pointsGained });
    };

    const handleIncorrectAnswer = () => {
        const pointsLost = userData.score - scoreAtLevelStart;
        let message = "Incorrect. Let's start this level again.";
        
        if (pointsLost > 0) {
            onUpdateStats({ score: scoreAtLevelStart });
            message = `Incorrect! You lose ${pointsLost} points. Let's start this level again.`;
        }
        
        setFeedback({
            message: message,
            points: -pointsLost,
            correct: false,
            image: 'https://placehold.co/400x300/E07272/333?text=Try+Again!'
        });
        setGameState('feedback');
        
        // Reset level progress
        setTimeout(() => {
            setCurrentQuestionIndex(0);
            setCurrentLevelProgress(0);
            setGameState('text-input');
            // Score was already reset in DB
        }, 2500);
    };

    const handleNextQuestion = () => {
        if (currentLevelProgress === currentLevel.questions.length) {
            // Level Complete!
            let nextLevel = (userData.currentLevel || 1) + 1;
            
            if (nextLevel > gameData.length) {
                // Game Complete!
                setModalContent({
                    title: "You're a Genius!",
                    message: "You have completed all the levels! Great job!",
                    buttonText: "Play Again"
                });
                nextLevel = 1; // Reset to level 1
            } else {
                // Next Level
                setModalContent({
                    title: "Level Complete!",
                    message: `Get ready for ${gameData[nextLevel - 1].levelName}!`,
                    buttonText: "Start Level"
                });
            }
            setIsLevelModalOpen(true);
            onUpdateStats({ currentLevel: nextLevel });

        } else {
            // Not level complete, just move to next question
            setCurrentQuestionIndex(currentLevelProgress);
            setGameState('text-input');
        }
    };
    
    const handleModalClick = () => {
        setIsLevelModalOpen(false);
        // The useEffect will handle loading the new level
    };
    
    // Shuffle options for MC
    const shuffledOptions = useMemo(() => {
        return [...currentQuestion.options].sort(() => Math.random() - 0.5);
    }, [currentQuestion]);
    
    const progressPercent = (currentLevelProgress / currentLevel.questions.length) * 100;

    return (
        <div className="lg:col-span-3 card">
            {/* Game Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                    <h2 className="font-display text-4xl text-teal-600">{currentLevel.levelName}</h2>
                    <span className="text-gray-600 font-semibold">Question {currentQuestionIndex + 1} / {currentLevel.questions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                    <div 
                        className="bg-yellow-400 h-full rounded-full transition-all duration-500 flex items-center justify-center"
                        style={{ width: `${progressPercent}%` }}
                    >
                        <span className="text-xs font-bold text-yellow-900">{Math.round(progressPercent)}%</span>
                    </div>
                </div>
            </div>

            {/* Question Text */}
            <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 min-h-[60px]">
                {currentQuestion.question}
            </p>

            {/* 1. Text Input Container */}
            {gameState === 'text-input' && (
                <div className="space-y-4">
                    <input 
                        type="text" 
                        className="input-field text-lg" 
                        placeholder="Type your answer here..."
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && handleTextSubmit()}
                    />
                    <button onClick={handleTextSubmit} className="btn btn-primary w-full text-lg py-3">Submit Answer</button>
                </div>
            )}

            {/* 2. Multiple Choice Container */}
            {gameState === 'mc-input' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {shuffledOptions.map((option) => (
                        <button 
                            key={option}
                            onClick={() => handleMcSubmit(option)}
                            className="btn btn-secondary text-lg py-3"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {/* 3. Image/Feedback Container */}
            {gameState === 'feedback' && (
                <div className="text-center">
                    <img 
                        src={feedback.image} 
                        alt="Answer" 
                        className="w-full max-w-lg mx-auto rounded-lg shadow-lg mb-4 h-auto object-cover"
                    />
                    <p className={`feedback ${feedback.correct ? 'feedback-correct' : 'feedback-incorrect'}`}>
                        {feedback.message}
                    </p>
                    {feedback.correct && (
                        <button onClick={handleNextQuestion} className="btn btn-primary text-lg py-3">
                            Next Question
                        </button>
                    )}
                </div>
            )}
            
            {isLevelModalOpen && (
                <LevelCompleteModal 
                    title={modalContent.title}
                    message={modalContent.message}
                    buttonText={modalContent.buttonText}
                    onClose={handleModalClick}
                />
            )}
        </div>
    );
};

/**
 * GameScreen: The main application screen for logged-in users
 */
const GameScreen = ({ user, userData, allUsers, onLogout, onProfileUpdate, onUpdateStats }) => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    
    return (
        <div className="w-full max-w-7xl mx-auto">
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

/**
 * ProfileModal: Modal for editing display name
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
                <h2 className="font-display text-4xl text-teal-600 mb-6">Edit Your Profile</h2>
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

/**
 * LevelCompleteModal: Modal for level/game complete
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


// --- 4. MAIN APP COMPONENT ---
export default function App() {
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
        updateUserStatsInFirestore
    } = useAuth();

    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="font-display text-5xl text-white">Loading...</h1>
            </div>
        );
    }
    
    if (!user || !userData) {
        return (
            <AuthScreen 
                onRegister={handleRegister} 
                onLogin={handleLogin} 
                error={authError} 
            />
        );
    }

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
