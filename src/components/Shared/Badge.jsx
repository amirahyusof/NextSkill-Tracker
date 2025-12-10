import React from 'react';
import './Badge.css';

const Badge = ({ badge, size = 'md' }) => {
    const { icon, name, description, earned, progress } = badge;

    return (
        <div className={`achievement-badge ${earned ? 'earned' : 'locked'} badge-${size}`}>
            <div className="badge-icon">{icon}</div>
            <div className="badge-content">
                <div className="badge-name">{name}</div>
                <div className="badge-description">{description}</div>
                {!earned && progress !== undefined && (
                    <div className="badge-progress">
                        <div className="badge-progress-bar">
                            <div
                                className="badge-progress-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="badge-progress-text">{progress}%</span>
                    </div>
                )}
                {earned && (
                    <div className="badge-earned">
                        <span className="badge-checkmark">✓</span> Earned
                    </div>
                )}
            </div>
        </div>
    );
};

export default Badge;
