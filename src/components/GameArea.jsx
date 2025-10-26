import React, { useState, useEffect, useMemo } from 'react';
// Import the modal component
import LevelCompleteModal from './LevelCompleteModal';
// Import the game data
import { gameData } from '../data/gameData';

/**
 * GameArea: The core quiz component
 * (Copied from src/App.jsx)
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
        const newLevelIndex = Math.max(0, (userData.currentLevel || 1) - 1);
        const levelData = gameData[newLevelIndex % gameData.length];
        
        setCurrentQuestionIndex(0);
        setCurrentLevelProgress(0);
        setScoreAtLevelStart(userData.score || 0);
        setGameState('text-input');
        
        onUpdateStats({ currentLevel: userData.currentLevel });
        
    }, [userData.currentLevel, userData.score]);
    
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
        
        setTimeout(() => {
            setCurrentQuestionIndex(0);
            setCurrentLevelProgress(0);
            setGameState('text-input');
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
            setCurrentQuestionIndex(currentLevelProgress);
            setGameState('text-input');
        }
    };
    
    const handleModalClick = () => {
        setIsLevelModalOpen(false);
    };
    
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

export default GameArea;