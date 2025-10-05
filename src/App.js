import React, { useState } from 'react';
import './App.css';

function App() {
  
  // State management for water tracking  core functionality
  const [glassesToday, setGlassesToday] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [dailyGoal] = useState(8); // Standard 8 glasses per day goal
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  // Add water function primary user interaction
  const addGlass = () => {
    setGlassesToday(prev => {
      const newCount = prev + 1;
      if (newCount >= dailyGoal) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      setLastAdded(Date.now());
      return newCount;
    });
  };

  // Reset function allows users to start fresh
  const resetDaily = () => {
    setGlassesToday(0);
  };

  const progressPercentage = Math.min((glassesToday / dailyGoal) * 100, 100);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">💧 Water Tracker</h1>
        <p className="app-subtitle">Stay hydrated, stay healthy</p>
      </header>

      <main className="app-main">
        {!showProgress ? (
          <div className="home-screen">
            <div className="counter-display">
              <div className="glasses-count">
                <span className="current-count">{glassesToday}</span>
                <span className="goal-count">/{dailyGoal}</span>
              </div>
              <p className="counter-label">Glasses today</p>
              {lastAdded && (
                <div className="recently-added">
                  <span className="water-drop">💧</span>
                  <span>Just added!</span>
                </div>
              )}
            </div>

            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="progress-text">
                {progressPercentage.toFixed(0)}% of daily goal
              </p>
            </div>

            <button 
              className={`add-button ${lastAdded ? 'just-clicked' : ''}`}
              onClick={addGlass}
              aria-label="Add one glass of water"
            >
              <span className="button-icon">💧</span>
              <span>Add 1 Glass</span>
            </button>

            {/* Secondary actions */}
            <div className="action-buttons">
              <button 
                className="secondary-button"
                onClick={resetDaily}
              >
                Reset Day
              </button>
              <button 
                className="secondary-button"
                onClick={() => setShowProgress(true)}
              >
                View Progress
              </button>
            </div>

            {/* Motivational message based on progress */}
            <div className="motivation-message">
              {glassesToday === 0 && (
                <p>💙 Start your hydration journey today!</p>
              )}
              {glassesToday > 0 && glassesToday < dailyGoal && (
                <p>🌊 Great start! Keep going! {glassesToday < dailyGoal/2 ? 'You\'re getting there!' : 'Almost there!'}</p>
              )}
              {glassesToday >= dailyGoal && (
                <p>🎉 Excellent! You've reached your daily goal!</p>
              )}
            </div>

            {/* Celebration overlay */}
            {showCelebration && (
              <div className="celebration-overlay">
                <div className="celebration-content">
                  <div className="celebration-emoji">🎉</div>
                  <h2>Goal Achieved!</h2>
                  <p>You're a hydration champion! 🏆</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Progress view  alternative screen for detailed tracking
          <div className="progress-screen">
            <h2>Your Progress</h2>
            
            <div className="progress-stats">
              <div className="stat-card">
                <h3>Today's Goal</h3>
                <p className="stat-number">{dailyGoal} glasses</p>
              </div>
              <div className="stat-card">
                <h3>Completed</h3>
                <p className="stat-number">{glassesToday} glasses</p>
              </div>
              <div className="stat-card">
                <h3>Remaining</h3>
                <p className="stat-number">{Math.max(0, dailyGoal - glassesToday)} glasses</p>
              </div>
            </div>

            <div className="progress-visual">
              <div className="circular-progress">
                <div className="progress-circle">
                  <span className="progress-percentage">{progressPercentage.toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <button 
              className="back-button"
              onClick={() => setShowProgress(false)}
            >
              ← Back to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

