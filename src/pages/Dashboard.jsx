import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { calculateCareerProgress, getTotalSubtopics, getCompletedSubtopics, getAllSubtopicsCount } from '../utils/progressCalculator';
import ProgressBar from '../components/Shared/ProgressBar';
import Badge from '../components/Shared/Badge';
import ConfirmDialog from '../components/Shared/ConfirmDialog';
import './Dashboard.css';

const CAREER_COLORS = ['#6A1E55', '#A64D79', '#8B4789', '#9B3D6F', '#7A2E5A'];
const CAREER_ICONS = ['💼', '🎯', '🚀', '📊', '💻', '🎨', '📈', '🔬', '🎓', '⚡'];

const Dashboard = ({ careers, setCareers, currentStreak, earnedBadges, allBadges }) => {
    const [userName, setUserName] = useState('');
    const [showNameModal, setShowNameModal] = useState(false);
    const [tempName, setTempName] = useState('');
    const [showAddCareer, setShowAddCareer] = useState(false);
    const [showBadges, setShowBadges] = useState(false);
    const [editingCareer, setEditingCareer] = useState(null);
    const [deleteCareer, setDeleteCareer] = useState(null);
    const [careerForm, setCareerForm] = useState({
        name: '',
        color: CAREER_COLORS[0],
        icon: CAREER_ICONS[0],
        targetDate: '',
        resources: ''
    });

    // Load user name from localStorage on mount
    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        } else {
            setShowNameModal(true);
        }
    }, []);

    const handleSaveName = (e) => {
        e.preventDefault();
        if (tempName.trim()) {
            setUserName(tempName.trim());
            localStorage.setItem('userName', tempName.trim());
            setShowNameModal(false);
            setTempName('');
        }
    };

    const stats = getAllSubtopicsCount(careers);
    const lastActivity = careers.length > 0
        ? new Date(Math.max(...careers.flatMap(c =>
            c.weeks?.flatMap(w =>
                w.subtopics?.map(s => new Date(s.createdAt || 0)) || []
            ) || []
        ))).toLocaleDateString('ms-MY')
        : 'Tiada aktiviti';

    const handleAddCareer = (e) => {
        e.preventDefault();
        const newCareer = {
            id: Date.now().toString(),
            ...careerForm,
            weeks: [],
            createdAt: new Date().toISOString()
        };
        setCareers([...careers, newCareer]);
        setShowAddCareer(false);
        setCareerForm({ name: '', color: CAREER_COLORS[0], icon: CAREER_ICONS[0], targetDate: '', resources: '' });
    };

    const handleEditCareer = (e) => {
        e.preventDefault();
        setCareers(careers.map(c => c.id === editingCareer.id ? { ...c, ...careerForm } : c));
        setEditingCareer(null);
        setCareerForm({ name: '', color: CAREER_COLORS[0], icon: CAREER_ICONS[0], targetDate: '', resources: '' });
    };

    const handleDeleteCareer = () => {
        setCareers(careers.filter(c => c.id !== deleteCareer.id));
        setDeleteCareer(null);
    };

    const openEditModal = (career) => {
        setEditingCareer(career);
        setCareerForm({
            name: career.name,
            color: career.color,
            icon: career.icon,
            targetDate: career.targetDate || '',
            resources: career.resources || ''
        });
    };

    return (
        <div className="dashboard">
            <div className="container">
                {/* Header */}
                <header className="dashboard-header">
                    <div>
                        <h1 className="gradient-text">Career Learning Tracker</h1>
                        <p className="dashboard-subtitle">
                            {userName ? `Selamat datang, ${userName}! 👋` : 'Jejak perjalanan pembelajaran anda'}
                        </p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-secondary btn-icon-text" onClick={() => setShowBadges(!showBadges)}>
                            <span className="btn-icon-only">🏆</span>
                            <span className="btn-text-full">Badges ({earnedBadges.length})</span>
                        </button>
                        <Link to="/settings" className="btn btn-secondary btn-icon-text">
                            <span className="btn-icon-only">⚙️</span>
                            <span className="btn-text-full">Settings</span>
                        </Link>
                        <button className="btn btn-primary btn-icon-text" onClick={() => setShowAddCareer(true)}>
                            <span className="btn-icon-only">➕</span>
                            <span className="btn-text-full">Tambah Kerjaya</span>
                        </button>
                    </div>
                </header>

                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-content">
                            <div className="stat-value">{careers.length}</div>
                            <div className="stat-label">Active Careers</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-content">
                            <div className="stat-value">{currentStreak}</div>
                            <div className="stat-label">Day Streak</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.completed}</div>
                            <div className="stat-label">Subtopics Completed</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <div className="stat-content">
                            <div className="stat-value">{lastActivity}</div>
                            <div className="stat-label">Last Activity</div>
                        </div>
                    </div>
                </div>

                {/* Badges Section */}
                {showBadges && (
                    <div className="badges-section">
                        <h2>🏆 Achievement Badges</h2>
                        <div className="badges-grid">
                            {allBadges.map(badge => (
                                <Badge key={badge.id} badge={badge} size="md" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Careers Grid */}
                {careers.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🎯</div>
                        <h2>Tiada Kerjaya Lagi</h2>
                        <p>Mulakan perjalanan pembelajaran anda dengan menambah kerjaya pertama!</p>
                        <button className="btn btn-primary btn-lg" onClick={() => setShowAddCareer(true)}>
                            ➕ Tambah Kerjaya Pertama
                        </button>
                    </div>
                ) : (
                    <div className="careers-grid">
                        {careers.map(career => {
                            const progress = calculateCareerProgress(career);
                            const totalSubtopics = getTotalSubtopics(career);
                            const completedSubtopics = getCompletedSubtopics(career);
                            const weekCount = career.weeks?.length || 0;

                            return (
                                <div key={career.id} className="career-card" style={{ borderColor: career.color }}>
                                    <div className="career-header">
                                        <div className="career-icon" style={{ background: career.color }}>
                                            {career.icon}
                                        </div>
                                        <div className="career-info">
                                            <h3>{career.name}</h3>
                                            <div className="career-meta">
                                                {weekCount} minggu • {completedSubtopics}/{totalSubtopics} subtopik
                                            </div>
                                        </div>
                                        <div className="career-actions">
                                            <button className="btn-icon btn-secondary" onClick={() => openEditModal(career)} title="Edit">
                                                ✏️
                                            </button>
                                            <button className="btn-icon btn-danger" onClick={() => setDeleteCareer(career)} title="Padam">
                                                🗑️
                                            </button>
                                        </div>
                                    </div>

                                    <ProgressBar progress={progress} size="md" />

                                    <Link to={`/career/${career.id}`} className="btn btn-primary btn-block">
                                        View Career →
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add/Edit Career Modal */}
            {(showAddCareer || editingCareer) && (
                <div className="modal-overlay" onClick={() => { setShowAddCareer(false); setEditingCareer(null); }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingCareer ? 'Edit Kerjaya' : 'Tambah Kerjaya Baru'}</h2>
                            <button className="btn-icon" onClick={() => { setShowAddCareer(false); setEditingCareer(null); }}>
                                ✕
                            </button>
                        </div>
                        <form onSubmit={editingCareer ? handleEditCareer : handleAddCareer}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Nama Kerjaya</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Contoh: Data Analyst"
                                        value={careerForm.name}
                                        onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Icon</label>
                                        <select
                                            className="form-select"
                                            value={careerForm.icon}
                                            onChange={(e) => setCareerForm({ ...careerForm, icon: e.target.value })}
                                        >
                                            {CAREER_ICONS.map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Warna</label>
                                        <select
                                            className="form-select"
                                            value={careerForm.color}
                                            onChange={(e) => setCareerForm({ ...careerForm, color: e.target.value })}
                                        >
                                            {CAREER_COLORS.map(color => (
                                                <option key={color} value={color}>{color}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Target Tarikh Siap (Opsional)</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={careerForm.targetDate}
                                        onChange={(e) => setCareerForm({ ...careerForm, targetDate: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Learning Resources (Opsional)</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Link atau nota sumber pembelajaran"
                                        value={careerForm.resources}
                                        onChange={(e) => setCareerForm({ ...careerForm, resources: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowAddCareer(false); setEditingCareer(null); }}>
                                    Batal
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingCareer ? 'Simpan' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* User Name Modal */}
            {showNameModal && (
                <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && userName && setShowNameModal(false)}>
                    <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{userName ? 'Edit Nama' : 'Selamat Datang! 👋'}</h2>
                            {userName && (
                                <button className="btn-icon" onClick={() => setShowNameModal(false)}>✕</button>
                            )}
                        </div>
                        <form onSubmit={handleSaveName}>
                            <div className="modal-body">
                                <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-secondary)' }}>
                                    {userName ? 'Tukar nama anda:' : 'Sila masukkan nama anda untuk personalisasi pengalaman:'}
                                </p>
                                <div className="form-group">
                                    <label className="form-label">Nama Anda</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Contoh: Ahmad"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                {userName && (
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowNameModal(false)}>
                                        Batal
                                    </button>
                                )}
                                <button type="submit" className="btn btn-primary">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteCareer}
                title="Padam Kerjaya"
                message={`Adakah anda pasti mahu memadam "${deleteCareer?.name}"? Semua minggu dan subtopik akan turut dipadam.`}
                onConfirm={handleDeleteCareer}
                onCancel={() => setDeleteCareer(null)}
                confirmText="Padam"
                danger={true}
            />
        </div>
    );
};

export default Dashboard;
