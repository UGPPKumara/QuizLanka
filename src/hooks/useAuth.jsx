import { useState, useEffect } from 'react';
import { 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithCustomToken
} from "firebase/auth";
import { 
    updateDoc,
    onSnapshot, 
    collection, 
    query,
} from "firebase/firestore";

// Import from your new config file
import { 
    auth, 
    db, 
    usersCollectionPath,
    GoogleAuthProvider,  // <-- New
    signInWithPopup,     // <-- New
    getDoc,              // <-- New
    doc,                 // <-- New
    setDoc               // <-- New
} from '../firebase/config';


// --- 2. CUSTOM AUTH HOOK ---
// (Copied from src/App.jsx and modified)
export default function useAuth() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [authError, setAuthError] = useState("");

    useEffect(() => {
        let userDocUnsubscribe = null;
        let memberListUnsubscribe = null;

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
            if (userDocUnsubscribe) userDocUnsubscribe();
            if (memberListUnsubscribe) memberListUnsubscribe();
            
            if (user) {
                setUser(user);
                
                const userDocRef = doc(db, usersCollectionPath, user.uid);
                userDocUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.warn("User doc not found!");
                    }
                });

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

        return () => {
            authUnsubscribe();
            if (userDocUnsubscribe) userDocUnsubscribe();
            if (memberListUnsubscribe) memberListUnsubscribe();
        };
    }, [isAuthReady]);

    const handleRegister = async (displayName, email, password) => {
        // (Function copied from src/App.jsx)
        if (displayName.length < 3) {
            setAuthError("Display Name must be at least 3 characters.");
            return;
        }
        setAuthError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            const userDocRef = doc(db, usersCollectionPath, user.uid);
            await setDoc(userDocRef, {
                userId: user.uid,
                displayName: displayName,
                score: 0,
                currentLevel: 1
            });
        } catch (error) {
            console.error("Registration Error:", error);
            setAuthError(error.message);
        }
    };

    const handleLogin = async (email, password) => {
        // (Function copied from src/App.jsx)
        setAuthError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login Error:", error);
            setAuthError(error.message);
        }
    };

    // --- NEW GOOGLE SIGN-IN FUNCTION ---
    const handleGoogleSignIn = async () => {
        setAuthError("");
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user doc exists, create if not
            const userDocRef = doc(db, usersCollectionPath, user.uid);
            const docSnap = await getDoc(userDocRef);

            if (!docSnap.exists()) {
                // This is a new user
                await setDoc(userDocRef, {
                    userId: user.uid,
                    displayName: user.displayName || 'Google User',
                    score: 0,
                    currentLevel: 1 // Start at level 1
                });
            }
            // If doc exists, onAuthStateChanged listener will handle it
            
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            setAuthError(error.message);
        }
    };

    const handleLogout = async () => {
        // (Function copied from src/App.jsx)
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };
    
    const handleProfileUpdate = async (newDisplayName) => {
        // (Function copied from src/App.jsx)
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
        } catch (error)
        {
            console.error("Error updating profile:", error);
            return "Failed to save. Please try again.";
        }
    };
    
    const updateUserStatsInFirestore = async (dataToUpdate) => {
        // (Function copied from src/App.jsx)
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
        updateUserStatsInFirestore,
        handleGoogleSignIn // <-- Return new function
    };
}