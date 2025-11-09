import React, { useState, useEffect, useMemo } from 'react';
// Import the modal component
import LevelCompleteModal from './LevelCompleteModal';
// Import the game data
import { gameData } from '../data/gameData';

/**
 * GameArea: The core quiz component
 * (Logic MODIFIED for bilingual answers, UI text kept in ENGLISH)
 */
const GameArea = ({ userData, onUpdateStats }) => {
    // ... (all state logic remains the same) ...

    // --- (all functions remain the same) ---
    
    // ... (all derived state remains the same) ...

    const progressPercent = (currentLevelProgress / currentLevel.questions.length) * 100;

    return (
        <div className="lg:col-span-3 card">
            {/* Game Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                    {/* UPDATED: Used .text-primary class */}
                    <h2 className="font-display text-4xl text-primary">{currentLevel.levelName}</h2>
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

            {/* Question Text (Bilingual) */}
            <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 min-h-[60px]">
                {currentQuestion.question}
            </p>

            {/* 1. Text Input Container */}
            {gameState === 'text-input' && (
                // ... (no changes in this block) ...
                <div className="space-y-4">
                    <input 
                        type="text" 
                        className="input-field text-lg" 
                        placeholder="Type your answer here..." // Kept in English
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && handleTextSubmit()}
                    />
                    <button onClick={handleTextSubmit} className="btn btn-primary w-full text-lg py-3">Submit Answer</button> {/* Kept in English */}
                </div>
            )}

            {/* 2. Multiple Choice Container */}
            {gameState === 'mc-input' && (
                // ... (no changes in this block) ...
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* --- MODIFIED: Display bilingual options --- */}
                    {shuffledOptions.map((option) => (
                        <button 
                            key={option.en} // Use en for key
                            onClick={() => handleMcSubmit(option)} // Pass the whole object
                            className="btn btn-secondary text-lg py-3"
                        >
                            {option.en} | {option.si}
                        </button>
                    ))}
                </div>
            )}

            {/* 3. Image/Feedback Container */}
            {gameState === 'feedback' && (
                // ... (no changes in this block) ...
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
                        </button> /* Kept in English */
                    )}
                </div>
            )}
            
            {isLevelModalOpen && (
                // ... (no changes in this block) ...
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