// Notes.jsx enables users to create, view, edit, and delete categorized notes.
// It fetches notes from the backend and updates global note count using context.


import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import './Notes.css';
import { useNavigate } from 'react-router-dom';
import { useNotes } from './NotesContext';

const Notes = () => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('General');
  const { notes, fetchNotes, setNotes, setNotesCount } = useNotes();

  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('General');

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }
      const newNote = {
        title: newNoteTitle,
        content: newNoteContent,
        category: newNoteCategory,
        user: user._id
      };
      const response = await axios.post('http://localhost:4000/note/add', newNote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true
      });
      setNotes([...notes, response.data.result]);
      setNotesCount(notes.length + 1);
      setNewNoteTitle('');
      setNewNoteContent('');
    } catch (err) {
      console.error('Error adding notes:', err);
    }
  };

  const categories = ['General', 'Work', 'Personal', 'Study', 'Health'];

  const handleEditNote = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }
      const updatedNote = {
        title: editTitle,
        content: editContent,
        category: editCategory,
        user: user._id
      };
      const response = await axios.put(`http://localhost:4000/note/edit/${editingNote._id}`, updatedNote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true
      });
      setNotes(notes.map(note => note._id === editingNote._id ? response.data.result : note));
      setSelectedNote(response.data.result);
      setEditingNote(null);
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }
      await axios.delete(`http://localhost:4000/note/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true
      });
      setNotes(notes.filter(note => note._id !== noteId));
      setNotesCount(notes.length - 1);
      if (selectedNote && selectedNote._id === noteId) {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const styles = {
    mainContainer: {
      padding: '1.25rem',
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      maxWidth: '75rem',
      margin: '0 auto'
    },
    title: {
      fontSize: '2rem',
      marginBottom: '1rem'
    },
    notesLayout: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    notesList: {
      flex: '1',
      maxHeight: '50vh',
      padding: '0.75rem',
      borderBottom: '1px solid #ddd'
    },
    noteItem: {
      padding: '0.625rem',
      fontSize: '1.1rem',
      cursor: 'pointer'
    },
    noteDetails: {
      flex: '1',
      padding: '0.75rem',
      maxHeight: '50vh'
    },
    formInputs: {
      padding: '0.8rem',
      marginBottom: '0.75rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    buttons: {
      padding: '0.6rem 1rem',
      fontSize: '1rem',
      margin: '0.5rem',
      cursor: 'pointer'
    },
    categoryRadios: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      fontSize: '1rem',
      marginBottom: '0.75rem'
    },
    noteTitleSize: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#6a6a6a'
    },
    noteContentSize: {
      fontSize: '1rem',
      lineHeight: '1.4rem',
      color: '#6a6a6a'
    },
    defaultNoteContentSize: {
      fontSize: '1.3rem',
      alignItems: 'center',
      padding: '0.6rem 1rem',
      color: '#6a6a6a'
    },
    noteCategorySize: {
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem'
    }
  };

  return (
    <div className='main_content_note' style={styles.mainContainer}>
      <h1 style={styles.title}>Thoughts in progress..</h1>
      <div className='add_note_form'>
        <input
          type='text'
          placeholder='Note Title'
          style={styles.formInputs}
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />
        <textarea
          placeholder='Note Content'
          style={styles.formInputs}
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <div className='category_radios' style={styles.categoryRadios}>
          {categories.map((category) => (
            <label key={category} style={styles.noteCategorySize}>
              <input
                type="radio"
                value={category}
                checked={newNoteCategory === category}
                onChange={(e) => setNewNoteCategory(e.target.value)}
              />
              {category}
            </label>
          ))}
        </div>
        <button onClick={handleAddNote} style={styles.buttons}>Add Note</button>
      </div>

      <div className='notes_layout' style={styles.notesLayout}>
        <div className='notes_list' style={styles.notesList}>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {notes.length === 0 ? (
              <li><h2 style={styles.noteTitleSize}>No notes available</h2></li>
            ) : (
              notes.map((note) => (
                <li
                  key={note._id}
                  className={`note_item ${selectedNote?._id === note._id ? 'active' : ''}`}
                  style={styles.noteItem}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="note_header">
                    <span className="note_title" style={styles.noteTitleSize}>{note.title}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="note_details" style={styles.noteDetails}>
          {editingNote ? (
            <div className="note_content">
              <h2 style={styles.title}>Edit Note</h2>
              <label style={styles.noteContentSize}>Title:</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={styles.formInputs}
              />
              <label style={styles.noteContentSize}>Content:</label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={styles.formInputs}
              />
              <div className='category_radios' style={styles.categoryRadios}>
                {categories.map((category) => (
                  <label key={category} style={styles.noteCategorySize}>
                    <input
                      type="radio"
                      value={category}
                      checked={editCategory === category}
                      onChange={(e) => setEditCategory(e.target.value)}
                    />
                    {category}
                  </label>
                ))}
              </div>
              <div className="note-actions">
                <button onClick={handleEditNote} style={styles.buttons}>
                  <FaEdit /> Save
                </button>
                <button onClick={() => setEditingNote(null)} style={styles.buttons}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : selectedNote ? (
            <div className="note_content">
              <h2 style={styles.title}>{selectedNote.title}</h2>
              <p style={styles.noteCategorySize}>
                <strong>Category:</strong>
                <span>{selectedNote.category}</span>
              </p>
              <div className="note-body">
                {selectedNote.content?.split('\n').map((line, i) => (
                  <p key={i} style={styles.noteContentSize}>{line}</p>
                ))}
              </div>
              <div className="note-actions">
                <button
                  onClick={() => {
                    setEditingNote(selectedNote);
                    setEditTitle(selectedNote.title);
                    setEditContent(selectedNote.content);
                    setEditCategory(selectedNote.category);
                  }}
                  style={styles.buttons}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteNote(selectedNote._id)}
                  style={styles.buttons}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ) : (
            <p style={styles.defaultNoteContentSize}>Select a note to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;


