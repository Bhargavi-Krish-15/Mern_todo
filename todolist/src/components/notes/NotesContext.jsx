import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [notesCount, setNotesCount] = useState(0);

  // Function to fetch notes
  const fetchNotes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        window.location.href = '/login';
        return;
      }
      const response = await axios.get("http://localhost:4000/note/get", {
        params: { user: user._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true
      });
      setNotes(response.data);
      setNotesCount(response.data.length);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Function to add a note
  const addNote = async (newNoteData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        window.location.href = '/login';
        return;
      }
      const response = await axios.post('http://localhost:4000/note/add', newNoteData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true
      });
      setNotes([...notes, response.data.result]);
      setNotesCount(notesCount + 1);
      return response.data.result;
    } catch (err) {
      console.error('Error adding note:', err);
      throw err; // Re-throw to handle in component
    }
  };

  // Function to update a note
  const updateNote = async (noteId, updatedNoteData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        window.location.href = '/login';
        return;
      }
      const response = await axios.put(`http://localhost:4000/note/edit/${noteId}`, updatedNoteData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true
      });
      const updatedNote = response.data.result;
      setNotes(notes.map(note => note._id === noteId ? updatedNote : note));
      return updatedNote;
    } catch (err) {
      console.error('Error updating note:', err);
      throw err;
    }
  };

  // Function to delete a note
  const deleteNote = async (noteId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        window.location.href = '/login';
        return;
      }
      await axios.delete(`http://localhost:4000/note/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true
      });
      setNotes(notes.filter(note => note._id !== noteId));
      setNotesCount(notesCount - 1);
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const value = {
    notes,
    notesCount,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export { NotesProvider, useNotes, NotesContext };

