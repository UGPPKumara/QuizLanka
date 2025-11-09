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
    signInWithRedirect, 
    getRedirectResult   
} from '../firebase/config';


// --- 2. CUSTOM AUTH HOOK ---
export default function useAuth() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [isAuthReady, setIsAuthReady] = useState(false); // <-- Starts as false
    const [authError, setAuthError] = useState("");

    // This useEffect hook runs when the app first loads
    useEffect(() => {
        let userDocUnsubscribe = null;
        let memberListUnsubscribe = null;

        (async () => {
            try {
                // First, check if we are coming back from a Google redirect
                const result = await getRedirectResult(auth);
                if (result) {
                    // This means the user just logged in via redirect
                    const user = result.user;
                    const userDocRef = doc(db, usersCollectionPath, user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (!docSnap.exists()) {
                        await setDoc(userDocRef, {
                            userId: user.uid,
                            email: user.email,
                            profileComplete: false, 
                            score: 0,
                            currentLevel: 1
                        });
                    }
                }
            } catch (error) {
                console.error("Google Redirect Error:", error);
                setAuthError(error.message);
                setIsAuthReady(true); // Even if redirect fails, we are "ready"
            }
            
            // --- This is the main listener ---
            const authUnsubscribe = onAuthStateChanged(auth, (user) => {
                if (userDocUnsubscribe) userDocUnsubscribe();
                if (memberListUnsubscribe) memberListUnsubscribe();
                
                if (user) {
                    // User is logged in, now get their DB doc
                    setUser(user);
                    const userDocRef = doc(db, usersCollectionPath, user.uid);
                    
                    userDocUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
                        if (docSnap.exists()) {
                            setUserData(docSnap.data());
                        } else {
                            // This can happen if doc creation is slow
                            setUserData(null); 
                        }
                        setIsAuthReady(true); // <-- NOW we are ready to show the app
                    });

                    // Also get the member list
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
                    // No user is logged in
                    setUser(null);
                    setUserData(null);
                    setAllUsers([]);
                    setIsAuthReady(true); // <-- We are also "ready" if there's no user
                }
            });

            return () => {
                authUnsubscribe();
                if (userDocUnsubscribe) userDocUnsubscribe();
                if (memberListUnsubscribe) memberListUnsubscribe();
            };
        })(); 

    }, []); 

    // ... (all other functions: handleRegister, handleLogin, etc. are correct) ...
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

    const handleGoogleSignIn = async () => {
        setAuthError("");
        const provider = new GoogleAuthProvider();
        try {
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