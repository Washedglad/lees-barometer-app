import React, { useState, useEffect } from 'react';
import './BarometerConverter.css';
import { FaStickyNote, FaTrash, FaSave, FaPlus, FaSearch, FaFileExport, FaCopy, FaDownload, FaTags, FaClipboard } from 'react-icons/fa';
import { playBoatHorn, playWaterClick } from '../utils/soundEffects';

// Pre-made templates for common tasks
const TEMPLATES = [
  {
    id: 'do-calibration',
    name: 'DO Probe Calibration',
    category: 'Calibration',
    content: `DO PROBE CALIBRATION

Equipment:
- Probe Model: 
- Serial Number: 
- Last Calibration: 

Setup:
- Temperature: _____°C
- Barometric Pressure: _____hPa
- Salinity: _____ppt

Readings:
- Initial Reading: _____mg/L
- Expected (100% sat): _____mg/L
- Difference: _____mg/L
- % Accuracy: _____%

Results:
☐ PASS - Within acceptable range
☐ FAIL - Requires adjustment

Notes:
_____________________________`
  },
  {
    id: 'ph-calibration',
    name: 'pH Meter Calibration',
    category: 'Calibration',
    content: `pH METER CALIBRATION

Equipment:
- Meter Model: 
- Probe Serial Number: 
- Last Calibration: 

Buffer Solutions:
- pH 7.0 Expiry: 
- pH 4.0 Expiry: 
- pH 10.0 Expiry: 

Temperature: _____°C

Readings:
- pH 7.0 Buffer: _____mV
- pH 4.0 Buffer: _____mV
- pH 10.0 Buffer: _____mV

Slope Calculation:
- Calculated Slope: _____%
- Status: ☐ Good (95-105%) ☐ Acceptable (85-95%) ☐ Poor (<85%)

Probe Condition:
☐ Clean
☐ Needs cleaning
☐ Stored properly
☐ Replace bulb

Results:
☐ PASS
☐ FAIL

Notes:
_____________________________`
  },
  {
    id: 'site-visit',
    name: 'Site Visit Log',
    category: 'Field Work',
    content: `SITE VISIT LOG

Site Information:
- Location: 
- Date: 
- Time: 
- Weather: 

Equipment Used:
- 
- 
- 

Measurements Taken:
Parameter          Reading          Notes
Temperature:      _____°C          ____________
DO:              _____mg/L        ____________
pH:              _____            ____________
Pressure:        _____hPa         ____________

Site Conditions:
_____________________________

Issues/Observations:
_____________________________

Follow-up Required:
☐ Yes - Details: ___________
☐ No

Next Visit: _____________________________`
  },
  {
    id: 'equipment-maintenance',
    name: 'Equipment Maintenance',
    category: 'Maintenance',
    content: `EQUIPMENT MAINTENANCE LOG

Equipment:
- Type: 
- Model: 
- Serial Number: 
- Location: 

Maintenance Type:
☐ Routine Inspection
☐ Cleaning
☐ Repair
☐ Replacement
☐ Other: ___________

Work Performed:
_____________________________

Parts Used:
_____________________________

Condition Before:
☐ Excellent ☐ Good ☐ Fair ☐ Poor

Condition After:
☐ Excellent ☐ Good ☐ Fair ☐ Poor

Time Spent: _____ hours

Next Maintenance Due: _____________________________

Technician: _____________________________`
  },
  {
    id: 'barometer-check',
    name: 'Barometer Check',
    category: 'Calibration',
    content: `BAROMETER CHECK

Equipment:
- Barometer Model: 
- Serial Number: 

Reference Data:
- Local Weather Station: _____hPa
- Expected Reading: _____hPa
- Temperature: _____°C
- Elevation: _____m

Barometer Reading:
- Reading: _____hPa
- Difference: _____hPa
- % Error: _____%

Acceptance Criteria: ±2 hPa

Results:
☐ PASS - Within tolerance
☐ FAIL - Requires adjustment

Notes:
_____________________________`
  },
  {
    id: 'blank',
    name: 'Blank Note',
    category: 'General',
    content: ''
  }
];

const CATEGORIES = ['All', 'Calibration', 'Field Work', 'Maintenance', 'Site Visit', 'General', 'Other'];

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '', category: 'General' });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showTemplates, setShowTemplates] = useState(false);

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
        category: currentNote.category || 'General',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
    }

    setCurrentNote({ title: '', content: '', category: 'General' });
  };

  const handleEditNote = (note) => {
    playWaterClick();
    setCurrentNote({ title: note.title, content: note.content, category: note.category || 'General' });
    setEditingId(note.id);
    setShowTemplates(false);
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
    setCurrentNote({ title: '', content: '', category: 'General' });
    setEditingId(null);
    setShowTemplates(false);
  };

  const handleUseTemplate = (template) => {
    playWaterClick();
    setCurrentNote({ 
      title: template.name,
      content: template.content,
      category: template.category
    });
    setEditingId(null);
    setShowTemplates(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportNote = (note) => {
    playWaterClick();
    const content = `${note.title}\n${'='.repeat(note.title.length)}\n\nCategory: ${note.category}\nCreated: ${formatDate(note.createdAt)}\nUpdated: ${formatDate(note.updatedAt)}\n\n${note.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleCopyNote = (note) => {
    playWaterClick();
    const content = `${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(content).then(() => {
      alert('Note copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy note');
    });
  };

  const handleExportAll = () => {
    playBoatHorn();
    if (filteredNotes.length === 0) {
      alert('No notes to export');
      return;
    }

    let content = `LEE'S BAROMETER READING APP - FIELD NOTES\n`;
    content += `${'='.repeat(50)}\n`;
    content += `Exported: ${new Date().toLocaleString()}\n`;
    content += `Total Notes: ${filteredNotes.length}\n\n`;

    filteredNotes.forEach((note, index) => {
      content += `\n${'─'.repeat(50)}\n`;
      content += `NOTE ${index + 1}: ${note.title}\n`;
      content += `${'─'.repeat(50)}\n`;
      content += `Category: ${note.category}\n`;
      content += `Created: ${formatDate(note.createdAt)}\n`;
      content += `Updated: ${formatDate(note.updatedAt)}\n\n`;
      content += `${note.content}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `field-notes-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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

  // Filter notes based on search and category
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="feature-container">
      <div className="feature-header">
        <FaStickyNote className="feature-icon" />
        <h2>Field Notes</h2>
      </div>

      {/* Templates Section */}
      <div className="card templates-section">
        <button 
          className="btn-secondary template-toggle"
          onClick={() => {
            playWaterClick();
            setShowTemplates(!showTemplates);
          }}
        >
          <FaStickyNote />
          {showTemplates ? 'Hide Templates' : 'Use Template'}
        </button>
        
        {showTemplates && (
          <div className="templates-grid">
            {TEMPLATES.map(template => (
              <button
                key={template.id}
                className="template-card"
                onClick={() => handleUseTemplate(template)}
              >
                <div className="template-name">{template.name}</div>
                <div className="template-category">{template.category}</div>
              </button>
            ))}
          </div>
        )}
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
            <label className="input-label">Category</label>
            <select
              className="select-field"
              value={currentNote.category}
              onChange={(e) => setCurrentNote({ ...currentNote, category: e.target.value })}
            >
              {CATEGORIES.filter(cat => cat !== 'All').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="input-section">
            <label className="input-label">Content</label>
            <textarea
              className="textarea-field"
              placeholder="Enter your field notes here...&#10;&#10;Examples:&#10;• Calibration readings&#10;• Site conditions&#10;• Equipment observations&#10;• Weather notes"
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              rows="12"
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

      {/* Search and Filter Section */}
      <div className="card search-filter-section">
        <div className="search-row">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search notes by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-buttons">
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  playWaterClick();
                  setSelectedCategory(category);
                }}
              >
                <FaTags className="filter-icon" />
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="export-row">
          <button className="btn-secondary export-btn" onClick={handleExportAll}>
            <FaFileExport />
            Export All Notes
          </button>
        </div>
      </div>

      <div className="notes-list-header">
        <h3>
          {selectedCategory === 'All' ? 'All Notes' : `${selectedCategory} Notes`}
          {' '}({filteredNotes.length})
          {searchQuery && ` - Search: "${searchQuery}"`}
        </h3>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="card info-card">
          <p className="empty-state">
            {notes.length === 0 
              ? 'No notes yet. Create your first field note above!'
              : 'No notes match your search or filter.'}
          </p>
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note-card card">
              <div className="note-header">
                <div className="note-title-section">
                  <h4 className="note-title">{note.title}</h4>
                  <span className="note-category-badge">{note.category || 'General'}</span>
                </div>
                <div className="note-actions">
                  <button 
                    className="icon-button copy-button"
                    onClick={() => handleCopyNote(note)}
                    title="Copy to clipboard"
                  >
                    <FaCopy />
                  </button>
                  <button 
                    className="icon-button export-button"
                    onClick={() => handleExportNote(note)}
                    title="Export as TXT"
                  >
                    <FaDownload />
                  </button>
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

