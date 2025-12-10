import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, size = 'md', showPercentage = true }) => {
    const safeProgress = Math.min(Math.max(progress || 0, 0), 100);

    return (
        <div className="progress-container">
            {showPercentage && (
                <div className="progress-label">
                    <span className="progress-percentage gradient-text">
                        {safeProgress}%
                    </span>
                </div>
            )}
            <div className={`progress-bar progress-bar-${size}`}>
                <div
                    className="progress-fill"
                    style={{ width: `${safeProgress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
