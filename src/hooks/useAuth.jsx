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
    GoogleAuthProvider,
    getDoc,
    doc,
    setDoc,
    signInWithRedirect, // <-- NEW
    getRedirectResult   // <-- NEW
} from '../firebase/config';


// --- 2. CUSTOM AUTH HOOK ---
export default function useAuth() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [authError, setAuthError] = useState("");

    // This useEffect hook runs when the app first loads
    useEffect(() => {
        let userDocUnsubscribe = null;
        let memberListUnsubscribe = null;

        // --- NEW: Handle the Google Redirect ---
        // We do this *before* setting the main listener
        // This 'try/catch' checks if the user is coming BACK from Google
        (async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    // This means the user just logged in via redirect
                    const user = result.user;
                    // Check if they are a new user
                    const userDocRef = doc(db, usersCollectionPath, user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (!docSnap.exists()) {
                        // This is a new user, create their doc
                        await setDoc(userDocRef, {
                            userId: user.uid,
                            email: user.email,
                            profileComplete: false, // Send to profile creation
                            score: 0,
                            currentLevel: 1
                        });
                    }
                    // If they exist, the onAuthStateChanged listener below will handle it
                }
            } catch (error) {
                console.error("Google Redirect Error:", error);
                setAuthError(error.message);
            }
            // --- End of new redirect logic ---


            // This is the main listener for auth changes
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
                            // This case is normal for a split second
                            // while the doc is being created above.
                            console.warn("Waiting for user doc to be created...");
                            setUserData(null);
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
                
                // We are ready to show the app
                setIsAuthReady(true);
            });

            return () => {
                authUnsubscribe();
                if (userDocUnsubscribe) userDocUnsubscribe();
                if (memberListUnsubscribe) memberListUnsubscribe();
            };
        })(); // We wrapped the effect in an async IIFE

    }, []); // Empty array ensures this runs only once on mount

    const handleRegister = async (email, password) => {
        setAuthError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            const userDocRef = doc(db, usersCollectionPath, user.uid);
            await setDoc(userDocRef, {
                userId: user.uid,
                email: user.email,
                profileComplete: false, 
                score: 0,
                currentLevel: 1
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

    // --- UPDATED GOOGLE SIGN-IN FUNCTION ---
    const handleGoogleSignIn = async () => {
        setAuthError("");
        const provider = new GoogleAuthProvider();
        try {
            // This function now just *starts* the redirect.
            // The logic above in useEffect() will handle the result.
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
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

    const handleProfileCreate = async (profileData) => {
        if (!user) return "No user is logged in.";
        if (!profileData.displayName || profileData.displayName.length < 3) {
            return "Display Name must be at least 3 characters.";
        }
        
        try {
            const userDocRef = doc(db, usersCollectionPath, user.uid);
            await updateDoc(userDocRef, {
                displayName: profileData.displayName,
                school: profileData.school || '',
                grade: profileData.grade || '',
                profileComplete: true 
            });
            return null; 
        } catch (error)
        {
            console.error("Error creating profile:", error);
            return "Failed to save profile. Please try again.";
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
            return null;
        } catch (error)
        {
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
        updateUserStatsInFirestore,
        handleProfileCreate,
        handleGoogleSignIn 
    };
}