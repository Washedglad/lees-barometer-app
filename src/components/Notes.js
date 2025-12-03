import React, { useState, useEffect } from 'react';
import './BarometerConverter.css';
import { FaStickyNote, FaTrash, FaSave, FaPlus } from 'react-icons/fa';
import { playBoatHorn, playWaterClick } from '../utils/soundEffects';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('lees-barometer-notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lees-barometer-notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!currentNote.title.trim() && !currentNote.content.trim()) {
      alert('Please enter a title or content for your note.');
      return;
    }

    playBoatHorn();

    if (editingId !== null) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingId 
          ? { ...currentNote, id: editingId, updatedAt: new Date().toISOString() }
          : note
      ));
      setEditingId(null);
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        title: currentNote.title.trim() || 'Untitled Note',
        content: currentNote.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
    }

    setCurrentNote({ title: '', content: '' });
  };

  const handleEditNote = (note) => {
    playWaterClick();
    setCurrentNote({ title: note.title, content: note.content });
    setEditingId(note.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteNote = (id) => {
    playWaterClick();
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
      if (editingId === id) {
        setCurrentNote({ title: '', content: '' });
        setEditingId(null);
      }
    }
  };

  const handleNewNote = () => {
    playWaterClick();
    setCurrentNote({ title: '', content: '' });
    setEditingId(null);
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="feature-container">
      <div className="feature-header">
        <FaStickyNote className="feature-icon" />
        <h2>Field Notes</h2>
      </div>

      <div className="card">
        <div className="notes-editor">
          <div className="input-section">
            <label className="input-label">
              {editingId ? '📝 Editing Note' : '📝 New Note'}
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Note Title (e.g., Site Visit - Location A)"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
            />
          </div>

          <div className="input-section">
            <label className="input-label">Content</label>
            <textarea
              className="textarea-field"
              placeholder="Enter your field notes here...&#10;&#10;Examples:&#10;• Calibration readings&#10;• Site conditions&#10;• Equipment observations&#10;• Weather notes"
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              rows="10"
            />
          </div>

          <div className="button-row">
            <button className="btn-primary" onClick={handleSaveNote}>
              <FaSave />
              {editingId ? 'Update Note' : 'Save Note'}
            </button>
            {editingId && (
              <button className="btn-secondary" onClick={handleNewNote}>
                <FaPlus />
                New Note
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="notes-list-header">
        <h3>Saved Notes ({notes.length})</h3>
      </div>

      {notes.length === 0 ? (
        <div className="card info-card">
          <p className="empty-state">
            No notes yet. Create your first field note above!
          </p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card card">
              <div className="note-header">
                <h4 className="note-title">{note.title}</h4>
                <div className="note-actions">
                  <button 
                    className="icon-button edit-button"
                    onClick={() => handleEditNote(note)}
                    title="Edit note"
                  >
                    📝
                  </button>
                  <button 
                    className="icon-button delete-button"
                    onClick={() => handleDeleteNote(note.id)}
                    title="Delete note"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="note-content">
                {note.content.split('\n').map((line, i) => (
                  <p key={i}>{line || '\u00A0'}</p>
                ))}
              </div>
              <div className="note-footer">
                <span className="note-date">
                  {note.updatedAt !== note.createdAt ? 'Updated: ' : 'Created: '}
                  {formatDate(note.updatedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;

