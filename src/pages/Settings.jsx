import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/Shared/ConfirmDialog';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState('');
  const userName = localStorage.getItem('userName') || '';

  const handleDeleteAllData = () => {
    localStorage.clear();
    setShowDeleteConfirm(false);
    // Redirect to home and force reload
    window.location.href = '/';
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      localStorage.setItem('userName', tempName.trim());
      setShowNameModal(false);
      setTempName('');
      // Reload to update name in dashboard
      navigate('/');
    }
  };

  return (
    <div className="settings-page">
      <div className="container">
        <div className="settings-header">
          <Link to="/" className="back-link">← Kembali ke Dashboard</Link>
          <h1>⚙️ Settings</h1>
          <p className="settings-subtitle">Urus tetapan aplikasi anda</p>
        </div>

        <div className="settings-content">
          {/* User Profile Section */}
          <div className="settings-section">
            <h2>👤 Profil Pengguna</h2>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Nama</div>
                <div className="setting-value">{userName || 'Tiada nama'}</div>
              </div>
              <button className="btn btn-secondary" onClick={() => setShowNameModal(true)}>
                ✏️ Edit
              </button>
            </div>
          </div>

          {/* Data Management Section */}
          <div className="settings-section">
            <h2>🗄️ Pengurusan Data</h2>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Padam Semua Data</div>
                <div className="setting-description">
                  Ini akan memadam semua kerjaya, minggu, subtopik, badges, streak, dan nama pengguna. Tindakan ini tidak boleh dibatalkan.
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => setShowDeleteConfirm(true)}>
                🗑️ Padam Semua
              </button>
            </div>
          </div>

          {/* App Info Section */}
          <div className="settings-section">
            <h2>ℹ️ Maklumat Aplikasi</h2>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Versi</div>
                <div className="setting-value">1.0.0</div>
              </div>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Penyimpanan</div>
                <div className="setting-value">LocalStorage (Browser)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Name Modal */}
      {showNameModal && (
        <div className="modal-overlay" onClick={() => setShowNameModal(false)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Nama</h2>
              <button className="btn-icon" onClick={() => setShowNameModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveName}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nama Anda</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={userName || "Contoh: Ahmad"}
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowNameModal(false)}>
                  Batal
                </button>
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
        isOpen={showDeleteConfirm}
        title="Padam Semua Data?"
        message="Adakah anda pasti mahu memadam SEMUA data? Ini termasuk semua kerjaya, minggu, subtopik, badges, streak, dan nama pengguna. Tindakan ini TIDAK BOLEH dibatalkan!"
        onConfirm={handleDeleteAllData}
        onCancel={() => setShowDeleteConfirm(false)}
        confirmText="Ya, Padam Semua"
        danger={true}
      />
    </div>
  );
};

export default Settings;
