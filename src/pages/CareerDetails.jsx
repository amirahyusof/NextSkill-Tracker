import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { calculateCareerProgress, calculateWeekProgress } from '../utils/progressCalculator';
import ProgressBar from '../components/Shared/ProgressBar';
import ConfirmDialog from '../components/Shared/ConfirmDialog';
import './CareerDetails.css';

const CareerDetails = ({ careers, setCareers, onSubtopicComplete }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const career = careers.find(c => c.id === id);

    const [expandedWeeks, setExpandedWeeks] = useState(new Set());
    const [showAddWeek, setShowAddWeek] = useState(false);
    const [showAddSubtopic, setShowAddSubtopic] = useState(null);
    const [editingWeek, setEditingWeek] = useState(null);
    const [editingSubtopic, setEditingSubtopic] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);

    const [weekForm, setWeekForm] = useState({ weekNumber: '', topicTitle: '' });
    const [subtopicForm, setSubtopicForm] = useState({
        title: '',
        difficulty: '',
        estimatedHours: '',
        notes: ''
    });

    if (!career) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Kerjaya tidak dijumpai</h2>
                <Link to="/" className="btn btn-primary">← Kembali ke Dashboard</Link>
            </div>
        );
    }

    const progress = calculateCareerProgress(career);

    const toggleWeek = (weekId) => {
        const newExpanded = new Set(expandedWeeks);
        if (newExpanded.has(weekId)) {
            newExpanded.delete(weekId);
        } else {
            newExpanded.add(weekId);
        }
        setExpandedWeeks(newExpanded);
    };

    const handleAddWeek = (e) => {
        e.preventDefault();
        const newWeek = {
            id: Date.now().toString(),
            weekNumber: parseInt(weekForm.weekNumber),
            topicTitle: weekForm.topicTitle,
            subtopics: []
        };
        const updatedCareer = {
            ...career,
            weeks: [...(career.weeks || []), newWeek].sort((a, b) => a.weekNumber - b.weekNumber)
        };
        setCareers(careers.map(c => c.id === career.id ? updatedCareer : c));
        setShowAddWeek(false);
        setWeekForm({ weekNumber: '', topicTitle: '' });
    };

    const handleEditWeek = (e) => {
        e.preventDefault();
        const updatedCareer = {
            ...career,
            weeks: career.weeks.map(w =>
                w.id === editingWeek.id
                    ? { ...w, weekNumber: parseInt(weekForm.weekNumber), topicTitle: weekForm.topicTitle }
                    : w
            ).sort((a, b) => a.weekNumber - b.weekNumber)
        };
        setCareers(careers.map(c => c.id === career.id ? updatedCareer : c));
        setEditingWeek(null);
        setWeekForm({ weekNumber: '', topicTitle: '' });
    };

    const handleDeleteWeek = () => {
        const updatedCareer = {
            ...career,
            weeks: career.weeks.filter(w => w.id !== deleteItem.id)
        };
        setCareers(careers.map(c => c.id === career.id ? updatedCareer : c));
        setDeleteItem(null);
    };

    const handleAddSubtopic = (e) => {
        e.preventDefault();
        const newSubtopic = {
            id: Date.now().toString(),
            title: subtopicForm.title,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null,
            difficulty: subtopicForm.difficulty || null,
            estimatedHours: subtopicForm.estimatedHours ? parseInt(subtopicForm.estimatedHours) : null,
            notes: subtopicForm.notes || null
        };
        const updatedCareer = {
            ...career,
            weeks: career.weeks.map(w =>
                w.id === showAddSubtopic
                    ? { ...w, subtopics: [...(w.subtopics || []), newSubtopic] }
                    : w
            )
        };
        setCareers(careers.map(c => c.id === career.id ? updatedCareer : c));
        setShowAddSubtopic(null);
        setSubtopicForm({ title: '', difficulty: '', estimatedHours: '', notes: '' });
    };

    const handleEditSubtopic = (e) => {
        e.preventDefault();
        const updatedCareer = {
            ...career,
            weeks: career.weeks.map(w => ({
                ...w,
                subtopics: w.subtopics?.map(s =>
                    s.id === editingSubtopic.subtopicId
                        ? {
                            ...s,
                            title: subtopicForm.title,
                            difficulty: subtopicForm.difficulty || null,
                            estimatedHours: subtopicForm.estimatedHours ? parseInt(subtopicForm.estimatedHours) : null,
                            notes: subtopicForm.notes || null
                        }
                        : s
                )
            }))
        };
        setCareers(careers.map(c => c.id === career.id ? updatedCareer : c));
        setEditingSubtopic(null);
        setSubtopicForm({ title: '', difficulty: '', estimatedHours: '', notes: '' });
    };

    const handleDeleteSubtopic = () => {
        const updatedCareer = {
            ...career,
            weeks: career.weeks.map(w => ({
                ...w,
                subtopics: w.subtopics?.filter(s => s.id !== deleteItem.id)
            }))
        };
        setCareers(careers.map(c => c.id === career.id ? updatedCareer : c));
        setDeleteItem(null);
    };

    const toggleSubtopicComplete = (weekId, subtopicId) => {
        const updatedCareer = {
            ...career,
            weeks: career.weeks.map(w => ({
                ...w,
                subtopics: w.subtopics?.map(s =>
                    s.id === subtopicId
                        ? {
                            ...s,
                            completed: !s.completed,
                            completedAt: !s.completed ? new Date().toISOString() : null
                        }
                        : s
                )
            }))
        };
        setCareers(careers.map(c => c.id === career.id ? updatedCareer : c));
        if (onSubtopicComplete) {
            onSubtopicComplete();
        }
    };

    const openEditWeek = (week) => {
        setEditingWeek(week);
        setWeekForm({ weekNumber: week.weekNumber.toString(), topicTitle: week.topicTitle });
    };

    const openEditSubtopic = (weekId, subtopic) => {
        setEditingSubtopic({ weekId, subtopicId: subtopic.id });
        setSubtopicForm({
            title: subtopic.title,
            difficulty: subtopic.difficulty || '',
            estimatedHours: subtopic.estimatedHours?.toString() || '',
            notes: subtopic.notes || ''
        });
    };

    return (
        <div className="career-details">
            <div className="container">
                {/* Header */}
                <div className="career-details-header">
                    <Link to="/" className="back-link">← Kembali</Link>

                    <div className="career-overview">
                        <div className="career-title-section">
                            <div className="career-icon-large" style={{ background: career.color }}>
                                {career.icon}
                            </div>
                            <div>
                                <h1>{career.name}</h1>
                                {career.targetDate && (
                                    <div className="target-date">
                                        🎯 Target: {new Date(career.targetDate).toLocaleDateString('ms-MY')}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="career-progress-section">
                            <ProgressBar progress={progress} size="lg" />
                        </div>

                        {career.resources && (
                            <div className="resources-section">
                                <h3>📚 Learning Resources</h3>
                                <p>{career.resources}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Weeks Section */}
                <div className="weeks-section">
                    <div className="weeks-header">
                        <h2>Minggu Pembelajaran</h2>
                        <button className="btn btn-primary" onClick={() => setShowAddWeek(true)}>
                            ➕ Tambah Minggu
                        </button>
                    </div>

                    {(!career.weeks || career.weeks.length === 0) ? (
                        <div className="empty-weeks">
                            <p>Tiada minggu lagi. Tambah minggu pertama untuk mulakan!</p>
                            <button className="btn btn-primary" onClick={() => setShowAddWeek(true)}>
                                ➕ Tambah Minggu Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="weeks-list">
                            {career.weeks.map(week => {
                                const weekProgress = calculateWeekProgress(week);
                                const isExpanded = expandedWeeks.has(week.id);

                                return (
                                    <div key={week.id} className="week-card">
                                        <div className="week-header" onClick={() => toggleWeek(week.id)}>
                                            <div className="week-info">
                                                <div className="week-number">Minggu {week.weekNumber}</div>
                                                <div className="week-title">{week.topicTitle}</div>
                                                <div className="week-meta">
                                                    {week.subtopics?.length || 0} subtopik • {weekProgress}% selesai
                                                </div>
                                            </div>
                                            <div className="week-actions" onClick={(e) => e.stopPropagation()}>
                                                <button className="btn-icon btn-secondary" onClick={() => openEditWeek(week)}>
                                                    ✏️
                                                </button>
                                                <button className="btn-icon btn-danger" onClick={() => setDeleteItem({ type: 'week', ...week })}>
                                                    🗑️
                                                </button>
                                                <button className="btn-icon btn-secondary">
                                                    {isExpanded ? '▲' : '▼'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="week-progress">
                                            <ProgressBar progress={weekProgress} size="sm" showPercentage={false} />
                                        </div>

                                        {isExpanded && (
                                            <div className="subtopics-section">
                                                <div className="subtopics-header">
                                                    <h4>Subtopik</h4>
                                                    <button className="btn btn-sm btn-primary" onClick={() => setShowAddSubtopic(week.id)}>
                                                        ➕ Tambah Subtopik
                                                    </button>
                                                </div>

                                                {(!week.subtopics || week.subtopics.length === 0) ? (
                                                    <p className="no-subtopics">Tiada subtopik. Tambah subtopik untuk minggu ini.</p>
                                                ) : (
                                                    <div className="subtopics-list">
                                                        {week.subtopics.map(subtopic => (
                                                            <div key={subtopic.id} className={`subtopic-item ${subtopic.completed ? 'completed' : ''}`}>
                                                                <div className="subtopic-checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={subtopic.completed}
                                                                        onChange={() => toggleSubtopicComplete(week.id, subtopic.id)}
                                                                        className="form-checkbox"
                                                                    />
                                                                </div>
                                                                <div className="subtopic-content">
                                                                    <div className="subtopic-title">{subtopic.title}</div>
                                                                    <div className="subtopic-meta">
                                                                        {subtopic.difficulty && (
                                                                            <span className={`difficulty-badge ${subtopic.difficulty}`}>
                                                                                {subtopic.difficulty}
                                                                            </span>
                                                                        )}
                                                                        {subtopic.estimatedHours && (
                                                                            <span className="meta-item">⏱️ {subtopic.estimatedHours}h</span>
                                                                        )}
                                                                        <span className="meta-item">
                                                                            📅 {new Date(subtopic.createdAt).toLocaleDateString('ms-MY')}
                                                                        </span>
                                                                    </div>
                                                                    {subtopic.notes && (
                                                                        <div className="subtopic-notes">{subtopic.notes}</div>
                                                                    )}
                                                                </div>
                                                                <div className="subtopic-actions">
                                                                    <button className="btn-icon btn-secondary" onClick={() => openEditSubtopic(week.id, subtopic)}>
                                                                        ✏️
                                                                    </button>
                                                                    <button className="btn-icon btn-danger" onClick={() => setDeleteItem({ type: 'subtopic', ...subtopic })}>
                                                                        🗑️
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Week Modal */}
            {(showAddWeek || editingWeek) && (
                <div className="modal-overlay" onClick={() => { setShowAddWeek(false); setEditingWeek(null); }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingWeek ? 'Edit Minggu' : 'Tambah Minggu Baru'}</h2>
                            <button className="btn-icon" onClick={() => { setShowAddWeek(false); setEditingWeek(null); }}>✕</button>
                        </div>
                        <form onSubmit={editingWeek ? handleEditWeek : handleAddWeek}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Nombor Minggu</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="1"
                                        value={weekForm.weekNumber}
                                        onChange={(e) => setWeekForm({ ...weekForm, weekNumber: e.target.value })}
                                        required
                                        min="1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Topik Minggu</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Contoh: Introduction to Data Analysis"
                                        value={weekForm.topicTitle}
                                        onChange={(e) => setWeekForm({ ...weekForm, topicTitle: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowAddWeek(false); setEditingWeek(null); }}>
                                    Batal
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingWeek ? 'Simpan' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add/Edit Subtopic Modal */}
            {(showAddSubtopic || editingSubtopic) && (
                <div className="modal-overlay" onClick={() => { setShowAddSubtopic(null); setEditingSubtopic(null); }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingSubtopic ? 'Edit Subtopik' : 'Tambah Subtopik Baru'}</h2>
                            <button className="btn-icon" onClick={() => { setShowAddSubtopic(null); setEditingSubtopic(null); }}>✕</button>
                        </div>
                        <form onSubmit={editingSubtopic ? handleEditSubtopic : handleAddSubtopic}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Tajuk Subtopik</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Contoh: Belajar Excel Pivot Tables"
                                        value={subtopicForm.title}
                                        onChange={(e) => setSubtopicForm({ ...subtopicForm, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Kesukaran (Opsional)</label>
                                        <select
                                            className="form-select"
                                            value={subtopicForm.difficulty}
                                            onChange={(e) => setSubtopicForm({ ...subtopicForm, difficulty: e.target.value })}
                                        >
                                            <option value="">Pilih...</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Anggaran Jam (Opsional)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="2"
                                            value={subtopicForm.estimatedHours}
                                            onChange={(e) => setSubtopicForm({ ...subtopicForm, estimatedHours: e.target.value })}
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Catatan (Opsional)</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Nota atau link sumber..."
                                        value={subtopicForm.notes}
                                        onChange={(e) => setSubtopicForm({ ...subtopicForm, notes: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowAddSubtopic(null); setEditingSubtopic(null); }}>
                                    Batal
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingSubtopic ? 'Simpan' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteItem}
                title={deleteItem?.type === 'week' ? 'Padam Minggu' : 'Padam Subtopik'}
                message={
                    deleteItem?.type === 'week'
                        ? `Adakah anda pasti mahu memadam Minggu ${deleteItem.weekNumber}? Semua subtopik akan turut dipadam.`
                        : `Adakah anda pasti mahu memadam subtopik "${deleteItem?.title}"?`
                }
                onConfirm={deleteItem?.type === 'week' ? handleDeleteWeek : handleDeleteSubtopic}
                onCancel={() => setDeleteItem(null)}
                confirmText="Padam"
                danger={true}
            />
        </div>
    );
};

export default CareerDetails;
