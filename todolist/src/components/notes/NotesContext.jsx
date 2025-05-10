import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// createContext is a React API that allows you to create a context object
// that can be used to share data between components without having to pass props down manually
const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [notesCount, setNotesCount] = useState(0);

  // fetchNotes function to get notes from the server
  const fetchNotes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      const response = await axios.get('http://localhost:4000/note/get', {
        params: { user: user._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true
      });

      setNotes(response.data);
      setNotesCount(response.data.length);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  // Fetch on first load
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    // NotesContext.Provider is a React component that provides the context value to its children
    // The value prop is an object that contains the data you want to share with the components that consume this context
    <NotesContext.Provider value={{
      notes,
      notesCount,
      fetchNotes,
      setNotes,        
      setNotesCount    
    }}>
      {/* Render the children components */}
      {/* This allows any component that is a child of NotesProvider to access the context value */}  
      
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
