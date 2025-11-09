import React, { useState } from 'react';
import Logo from '../assets/Logo.png';

/**
 * AuthScreen: Login and Register Forms
 * (RE-ADDED Google Sign-In)
 */
const AuthScreen = ({ onRegister, onLogin, onGoogleSignIn, error }) => { // <-- RE-ADDED onGoogleSignIn
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // DisplayName is removed, as requested

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoginView) {
            onLogin(email, password);
        } else {
            onRegister(email, password); // Register with just email/pass
        }
    };

    return (
        <div className="w-full max-w-md mx-auto flex h-screen items-center">
            <div className="card text-center dirextion-center w-4xl p-8">
                <img src={Logo} alt="Lanka Genius Quiz Logo" className="w-auto h-24 mx-auto mb-4" />
                
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
                    {/* Display Name field is removed from registration */}
                    
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

                    {/* --- RE-ADDED GOOGLE BUTTON --- */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300"></span>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        onClick={onGoogleSignIn} 
                        className="btn btn-secondary w-full flex items-center justify-center gap-2"
                    >
                        {/* Google SVG Icon */}
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.611 20.083H42V20H24V28H35.303C33.61 32.657 29.223 36 24 36C18.477 36 14 31.523 14 26C14 20.477 18.477 16 24 16C26.46 16 28.69 16.953 30.49 18.455L36.338 12.606C33.223 9.539 28.93 8 24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40C32.837 40 40 32.837 40 24C40 22.699 39.866 21.42 39.611 20.083H43.611Z" fill="#FFC107"></path><path d="M6.306 14.691L12.607 19.16C13.987 16.03 16.63 13.783 19.96 12.606L14.112 6.757C10.703 8.898 7.868 11.533 6.306 14.691Z" fill="#FF3D00"></path><path d="M24 48C30.937 48 36.96 45.02 40.85 40.15L34.902 34.302C32.74 36.422 29.62 37.95 26 37.95C21.93 37.95 18.3 36.14 16.32 33.15L9.92 37.62C13.03 44.02 18.13 48 24 48Z" fill="#4CAF50"></path><path d="M43.611 20.083H42V20H24V28H35.303C34.51 30.15 33.07 31.95 31.32 33.16L37.168 39.01C41.05 36.03 44 31.3 44 26C44 23.8 43.866 21.8 43.611 20.083Z" fill="#1976D2"></path></svg>
                        Sign in with Google
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AuthScreen;