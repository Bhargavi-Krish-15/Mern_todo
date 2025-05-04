// import React from 'react'
// import {useState, useEffect} from 'react'
// import axios from "axios";
// import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
// import './Notes.css';

// // returns scale based on window width relative to a base design width
// const getScale = () => {
//   const baseWidth = 1440;
//   const scale_factor = window.innerWidth / baseWidth;
//   return Math.min(Math.max(scale_factor, 0.6), 1); // prevent upscaling on large screens and also set minimum scale
// };

// // use redux or context api
// const Notes = ({sendNotesCount}) => {
//     const [notes, setNotes] = useState([]);
//     const [newNoteTitle, setNewNoteTitle] = useState('');
//     const [newNoteContent, setNewNoteContent] = useState('');
//     const [newNoteCategory, setNewNoteCategory] = useState('General');
//     const [noteCount, setNoteCount] = useState(0);

//     // for selecting which note to be showed
//     const [selectedNote, setSelectedNote] = useState(null);
//     // for editing the note
//     const [editingNote, setEditingNote] = useState(null);
//     const [editTitle, setEditTitle] = useState('');
//     const [editContent, setEditContent] = useState('');
//     const [editCategory, setEditCategory] = useState('General');

//     // for responsive styles
//     const [scale, setScale] = useState(getScale());
//     const [isNarrow, setIsNarrow] = useState(window.innerWidth < 768);

//     const fetchNotes = async() => {
//         try {
//             // get the current user
//             const user = JSON.parse(localStorage.getItem('user'));
//             if (!user) {
//                 window.location.href = '/login';
//                 return;
//             }
//             // make a GET request to fetch notes
//             const response = await axios.get("http://localhost:4000/note/get", {
//                 params: { user: user._id },
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
//                 },
//                 withCredentials: true, 
//             })
//             console.log("notes count",response);
//             console.log("Notes data:", response.data);
//             console.log("Notes length:", response.data.length);
//             setNotes(response.data);

//             setNoteCount(response.data.length);
//             sendNotesCount(response.data.length);
//             console.log("Notes fetched successfully:", response.data);
//         }
//         catch(err){
//             console.log("Error fetching notes:", err);
//         }
//     }

//     useEffect(() => {
//         fetchNotes();

//         const handleResize = () => {
//             setScale(getScale());
//             setIsNarrow(window.innerWidth < 768);
//         };

//         window.addEventListener('resize', handleResize);
        
//         // Clean up
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const handleAddNote = async() => {
//         try {
//             const user = JSON.parse(localStorage.getItem('user'));
//             if (!user) {
//                 window.location.href = '/login';
//                 return;
//             }
//             const newNote = {
//                 title: newNoteTitle,
//                 content: newNoteContent,
//                 category: newNoteCategory,
//                 user: user._id
//             };
//             console.log("new note: ", newNote);
//             const response = await axios.post('http://localhost:4000/note/add', 
//             newNote,    
//         {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('access_token')}` 
//             },
//             withCredentials: true 
//         });
//         console.log("response after ",response.data);
//         setNotes([...notes, response.data.result]);
//         setNoteCount(noteCount + 1); // Increment the note count
//         sendNotesCount(noteCount + 1);
//         setNewNoteTitle('');
//         setNewNoteContent('');
//         } catch (err) {
//             console.error('Error adding notes:', err);
//         }
//     }
    
//     const categories = ['General', 'Work', 'Personal', 'Study', 'Health'];

//     const handleEditNote = async() => {
        
//         try {
//             const user = JSON.parse(localStorage.getItem('user'));
//             if (!user) {
//                 window.location.href = '/login';
//                 return;
//             }
//             const updatedNote = {
//                 title: editTitle,
//                 content: editContent,
//                 category: editCategory,
//                 user: user._id
//             };
//             console.log("updated note: ", updatedNote);
//             const response = await axios.put(`http://localhost:4000/note/edit/${editingNote._id}`, updatedNote, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
//                 },
//                 withCredentials: true // Include credentials in the request
//             });
//             console.log("response edit",response);
//             // Update the notes state with the edited note
//             // Filter the notes array to find the note with the matching ID and update it
//             setNotes(notes.map(note => note._id === editingNote._id ? response.data.result : note));
//             setSelectedNote(response.data.result); // Set the selected note to the updated note
//             setEditingNote(null); // Clear the editing note state
            
            
//         } catch (err) {
//             console.error('Error updating note:', err);
//         }
//     }

//     const handleDeleteNote = async(noteId) => {
//         try {
//             const user = JSON.parse(localStorage.getItem('user'));
//             if (!user) {
//                 window.location.href = '/login';
//                 return;
//             }
//             const response = await axios.delete(`http://localhost:4000/note/delete/${noteId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
//                 },
//                 withCredentials: true // Include credentials in the request
//             });
//             console.log("response after delete",response);
//             // Filter the notes array to remove the deleted note
//             setNotes(notes.filter(note => note._id !== noteId));
//             setNoteCount(noteCount - 1); // Decrement the note count
//             sendNotesCount(noteCount - 1);
//             if (selectedNote && selectedNote._id === noteId) {
//                 setSelectedNote(null);
//             }
//         } catch (err) {
//             console.error('Error deleting note:', err);
//         }
//     }

//     // No need for a separate function, directly define styles here
//     const styles = {
//         mainContainer: {
//             padding: `${1.25 * scale}rem`,
//             fontFamily: 'Arial, sans-serif',
//             width: '100%',
//             maxWidth: '1200px',
//             margin: '0 auto'
//         },
//         title: {
//             fontSize: `${2 * scale}rem`,
//             marginBottom: `${1 * scale}rem`
//         },
//         notesLayout: {
//             display: isNarrow ? 'flex' : 'grid',
//             flexDirection: isNarrow ? 'column' : 'row',
//             gridTemplateColumns: isNarrow ? '1fr' : '30% 70%',
//             gap: `${0.75 * scale}rem`
//         },
//         notesList: {
//             maxHeight: `${50 * scale}vh`,
//             padding: `${0.75 * scale}rem`,
//             borderRight: isNarrow ? 'none' : '1px solid #ddd',
//             borderBottom: isNarrow ? '1px solid #ddd' : 'none',
//             marginBottom: isNarrow ? `${0.75 * scale}rem` : '0'
//         },
//         noteItem: {
//             padding: `${0.625 * scale}rem`,
//             fontSize: `${1.1 * scale}rem`,
//             cursor: 'pointer'
//         },
//         noteDetails: {
//             padding: `${0.75 * scale}rem`,
//             maxHeight: `${50 * scale}vh`
//         },
//         formInputs: {
//             padding: `${0.8 * scale}rem`,
//             marginBottom: `${0.75 * scale}rem`,
//             width: '100%',
//             boxSizing: 'border-box'
//         },
//         buttons: {
//             padding: `${0.6 * scale}rem ${1 * scale}rem`,
//             fontSize: `${1 * scale}rem`,
//             margin: `${0.5 * scale}rem`,
//             cursor: 'pointer'
//         },
//         categoryRadios: {
//             display: 'flex',
//             flexDirection: isNarrow ? 'column' : 'row',
//             gap: `${0.5 * scale}rem`,
//             fontSize: `${1 * scale}rem`,
//             marginBottom: `${0.75 * scale}rem`
//         },
//         noteTitleSize: {
//             fontSize: `${1.2 * scale}rem`,
//             fontWeight: 'bold',
//             color: '#6a6a6a'
//         },
//         noteContentSize: {
//             fontSize: `${1 * scale}rem`,
//             lineHeight: `${1.4 * scale}rem`,
//             color: '#6a6a6a'
//         },
//         defaultNoteContentSize:{
//             fontSize: `${1.3 * scale}rem`,
//             alignItems: 'center',
//             padding: `${0.6 * scale}rem ${1 * scale}rem`,
//             color: '#6a6a6a',
//         },
//         noteCategorySize: {
//             fontSize: `${0.9 * scale}rem`,
//             display: 'flex',
//             alignItems: 'center',
//             gap: `${0.3 * scale}rem`
//         }
//     };

//     return (
//         <div className='main_content_note' style={styles.mainContainer}>
//             <h1 style={styles.title}>Thoughts in progress..</h1>

//             {/* Add Note */}
//             <div className='add_note_form'>
//                 <input 
//                     type='text' 
//                     placeholder='Note Title' 
//                     style={styles.formInputs} 
//                     value={newNoteTitle} 
//                     onChange={(e) => setNewNoteTitle(e.target.value)}
//                 /> 
//                 <textarea 
//                     placeholder='Note Content' 
//                     style={styles.formInputs} 
//                     value={newNoteContent} 
//                     onChange={(e) => setNewNoteContent(e.target.value)}
//                 /> 
//                 <div className='category_radios' style={styles.categoryRadios}>
//                     {categories.map((category) => (
//                         <label key={category} style={styles.noteCategorySize}>
//                             <input 
//                                 type="radio" 
//                                 value={category} 
//                                 checked={newNoteCategory === category} 
//                                 onChange={(e) => setNewNoteCategory(e.target.value)}
//                             />
//                             {category}
//                         </label>
//                     ))}
//                 </div>
        
//                 <button onClick={handleAddNote} style={styles.buttons}>Add Note</button>
//             </div>

//             <div className='notes_layout' style={styles.notesLayout}>
//                 <div className='notes_list' style={styles.notesList}>
//                     <ul>
//                         {notes.length === 0 ? (
//                             <li><h2 style={styles.noteTitleSize}>No notes available</h2></li>
//                         ) : (
//                             notes.map((note) => (
//                                 <li 
//                                     key={note._id} 
//                                     className={`note_item ${selectedNote?._id === note._id ? 'active' : '' }`} 
//                                     style={{...styles.noteItem, cursor: 'pointer'}} 
//                                     onClick={() => setSelectedNote(note)}
//                                 >
//                                     <div className="note_header">
//                                         <span className="note_title" style={styles.noteTitleSize}>{note.title}</span>
//                                     </div>
//                                 </li>
//                             ))
//                         )}
//                     </ul>
//                 </div>
                
//                 <div className="note_details" style={styles.noteDetails}>
//                     {editingNote ? (
//                         <div className="note_content">
//                             <h2 style={styles.title}>Edit Note</h2>
//                             <label style={styles.noteContentSize}>Title:</label>
//                             <input
//                                 type="text"
//                                 value={editTitle}
//                                 onChange={(e) => setEditTitle(e.target.value)}
//                                 style={styles.formInputs}
//                             />
//                             <label style={styles.noteContentSize}>Content:</label>
//                             <textarea
//                                 value={editContent}
//                                 onChange={(e) => setEditContent(e.target.value)}
//                                 style={styles.formInputs}
//                             />
//                             <div className='category_radios' style={styles.categoryRadios}>
//                                 {categories.map((category) => (
//                                     <label key={category} style={styles.noteCategorySize}>
//                                         <input
//                                             type="radio"
//                                             value={category}
//                                             checked={editCategory === category}
//                                             onChange={(e) => setEditCategory(e.target.value)}
//                                         />
//                                         {category}
//                                     </label>
//                                 ))}
//                             </div>
//                             <div className="note-actions">
//                                 <button onClick={handleEditNote} style={styles.buttons}>
//                                     <FaEdit /> Save
//                                 </button>
//                                 <button onClick={() => setEditingNote(null)} style={styles.buttons}>
//                                     <FaTimes /> Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     ) : selectedNote ? (
//                         <div className="note_content">
//                             <h2 style={styles.title}>{selectedNote.title}</h2>
//                             <p style={styles.noteCategorySize}>
//                                 <strong>Category:</strong>
//                                 <span>{selectedNote.category}</span>
//                             </p>
//                             <div className="note-body">
//                                 {selectedNote.content?.split('\n').map((line, i) => (
//                                     <p key={i} style={styles.noteContentSize}>{line}</p>
//                                 ))}
//                             </div>
//                             <div className="note-actions">
//                                 <FaEdit onClick={() => {
//                                     setEditingNote(selectedNote);
//                                     setEditTitle(selectedNote.title);
//                                     setEditContent(selectedNote.content);
//                                     setEditCategory(selectedNote.category);
//                                 }} style={styles.buttons}>
//                                     Edit
//                                 </FaEdit>
//                                 <FaTrash onClick={() => handleDeleteNote(selectedNote._id)} style={styles.buttons}>
//                                     Delete
//                                 </FaTrash>
//                             </div>
//                         </div>
//                     ) : (
//                         <p style={styles.defaultNoteContentSize}>Select a note to view details</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Notes

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import './Notes.css';

const Notes = ({ sendNotesCount }) => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('General');
  const [noteCount, setNoteCount] = useState(0);

  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('General');

  // For responsive layout (not for scaling)
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 768);

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
        withCredentials: true,
      });
      setNotes(response.data);
      setNoteCount(response.data.length);
      sendNotesCount(response.data.length);
    }
    catch (err) {
      console.log("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();

    // Handle window resize to set isNarrow state
    const handleResize = () => {
        console.log('isNarrow', isNarrow)
      setIsNarrow(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddNote = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        window.location.href = '/login';
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
      setNoteCount(noteCount + 1);
      sendNotesCount(noteCount + 1);
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
        window.location.href = '/login';
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
      setNoteCount(noteCount - 1);
      sendNotesCount(noteCount - 1);
      if (selectedNote && selectedNote._id === noteId) {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  // Styles: ONLY rem units, no scale, no px
  const styles = {
    mainContainer: {
      padding: '1.25rem',
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      maxWidth: '75rem', // 1200px
      margin: '0 auto'
    },
    title: {
      fontSize: '2rem',
      marginBottom: '1rem'
    },
    notesLayout: {
      display: isNarrow ? 'flex' : 'grid',
      flexDirection: isNarrow ? 'column' : undefined,
      gridTemplateColumns: isNarrow ? undefined : '30% 70%',
      gap: '0.75rem'
    },
    notesList: {
      maxHeight: '50vh',
      padding: '0.75rem',
      borderRight: isNarrow ? 'none' : '1px solid #ddd',
      borderBottom: isNarrow ? '1px solid #ddd' : 'none',
      marginBottom: isNarrow ? '0.75rem' : '0'
    },
    noteItem: {
      padding: '0.625rem',
      fontSize: '1.1rem',
      cursor: 'pointer'
    },
    noteDetails: {
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
      flexDirection: isNarrow ? 'column' : 'row',
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
      color: '#6a6a6a',
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
      {/* Add Note */}
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

