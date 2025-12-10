import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CareerDetails from './pages/CareerDetails';
import Settings from './pages/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useStreak } from './hooks/useStreak';
import { useBadges } from './hooks/useBadges';
import { getAllSubtopicsCount, calculateCareerProgress } from './utils/progressCalculator';
import './App.css';

function App() {
  const [careers, setCareers] = useLocalStorage('careers', []);
  const { currentStreak, recordActivity } = useStreak();

  // Calculate stats for badges
  const stats = {
    completedSubtopics: getAllSubtopicsCount(careers).completed,
    currentStreak: currentStreak,
    completedCareers: careers.filter(c => calculateCareerProgress(c) === 100).length,
    activeCareers: careers.length
  };

  const { earnedBadges, allBadges, checkAndAwardBadges } = useBadges(stats);
  const [newBadges, setNewBadges] = useState([]);

  // Check for new badges whenever stats change
  useEffect(() => {
    const badges = checkAndAwardBadges();
    if (badges.length > 0) {
      setNewBadges(badges);
      // Auto-hide notification after 5 seconds
      setTimeout(() => setNewBadges([]), 5000);
    }
  }, [stats.completedSubtopics, stats.currentStreak, stats.completedCareers, stats.activeCareers]);

  const handleSubtopicComplete = () => {
    recordActivity();
  };

  return (
    <Router>
      <div className="app">
        {/* New Badge Notification */}
        {newBadges.length > 0 && (
          <div className="badge-notification">
            {newBadges.map(badge => (
              <div key={badge.id} className="badge-alert">
                <span className="badge-alert-icon">{badge.icon}</span>
                <div>
                  <div className="badge-alert-title">New Badge Earned!</div>
                  <div className="badge-alert-name">{badge.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                careers={careers}
                setCareers={setCareers}
                currentStreak={currentStreak}
                earnedBadges={earnedBadges}
                allBadges={allBadges}
              />
            }
          />
          <Route
            path="/career/:id"
            element={
              <CareerDetails
                careers={careers}
                setCareers={setCareers}
                onSubtopicComplete={handleSubtopicComplete}
              />
            }
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
