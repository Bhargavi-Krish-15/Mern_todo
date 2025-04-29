import React from 'react'
import {useState, useEffect, useCallback} from 'react'
import axios from "axios";
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

// use redux or context api
const Notes = ({sendNotesCount}) => {
    const [notes, setNotes] = useState([]);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');
    const [newNoteCategory, setNewNoteCategory] = useState('General');
    const [noteCount, setNoteCount] = useState(0);

    // for selecting which note to be showed
    const [selectedNote, setSelectedNote] = useState(null);
    // for editing the note
    const [editingNote, setEditingNote] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editCategory, setEditCategory] = useState('General');

    // for responsive styles:
    // we are using useState to get the window size - Tracks current window dimensions
    // and useEffect to update the window size on resize
      // For responsive design
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
     // Get the root font size for rem calculations
    //  Retrieves the base font size (font-size) of the root HTML element 
    const getRootFontSize = () => {
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    };
    
    // ensure styles scale properly across devices.
    // Convert px to rem for a value
    const pxToRem = (px) => {
        return `${px / getRootFontSize()}rem`;
    };
    
    // Calculate styles based on screen dimensions proportionally using rem units
    // usecallback - only change if the window size changes
    const getResponsiveStyles = useCallback(() => {
        const { width, height } = windowSize;
        const rootFontSize = getRootFontSize();
        
        // Calculate base measurements fontsize and spacing
        // Convert all final values to rem
        // The base font size and spacing are calculated based on the viewport width
        // and are clamped to a range to ensure readability
        // The base font size is between 0.75rem and 1.125rem
        // why 0.75 ? checking between 0.75 and 1.125 this is the smallest font size range, whchi is like 12px to 18px
        // lets assume our scaling factor be 80:
        const baseFontSize = Math.max(0.75, Math.min(1.125, width / (80 * rootFontSize))); // Between 0.75-1.125rem
        // 5.2 px to 8 px
        // scalling factor is 100:
        const baseSpacing = Math.max(0.3125, Math.min(1.25, width / (100 * rootFontSize))); // Between 0.3125-1.25rem
        
        // Determine layout proportions based on available space
        const columnRatio = Math.max(0.2, Math.min(0.33, width / 3000));
        // for mobiles - Simple check for very narrow screens
        const isNarrow = width < 500; 
        
        // Calculate height-based measurements
        const maxHeightProportion = Math.max(0.3, Math.min(0.5, height / 1000));
        
        return {
            mainContainer: {
                padding: `${baseSpacing}rem`,
                fontSize: `${baseFontSize}rem`,
            },
            title: {
                fontSize: `${baseFontSize * 1.6}rem`,
                marginBottom: `${baseSpacing * 1.5}rem`,
            },
            notesLayout: {
                display: isNarrow ? 'flex' : 'grid',
                flexDirection: isNarrow ? 'column' : 'row',
                gridTemplateColumns: isNarrow ? '1fr' : `${columnRatio * 100}% ${(1 - columnRatio) * 100}%`,
                gap: `${baseSpacing}rem`,
            },
            notesList: {
                maxHeight: `${maxHeightProportion * 100}vh`,
                padding: `${baseSpacing}rem`,
                borderRight: isNarrow ? 'none' : '1px solid #ddd',
                borderBottom: isNarrow ? '1px solid #ddd' : 'none',
                marginBottom: isNarrow ? `${baseSpacing}rem` : '0',
            },
            noteItem: {
                padding: `${baseSpacing * 0.5}rem`,
                fontSize: `${baseFontSize * 1.1}rem`,
                cursor: 'pointer',
            },
            noteDetails: {
                padding: `${baseSpacing}rem`,
                maxHeight: `${maxHeightProportion * 100}vh`,
            },
            formInputs: {
                padding: `${baseSpacing * 0.8}rem`,
                marginBottom: `${baseSpacing}rem`,
                width: '100%',
                boxSizing: 'border-box',
            },
            buttons: {
                padding: `${baseSpacing * 0.8}rem ${baseSpacing * 1.2}rem`,
                fontSize: `${baseFontSize}rem`,
                margin: `${baseSpacing * 0.5}rem`,
            },
            categoryRadios: {
                display: 'flex',
                flexDirection: isNarrow ? 'column' : 'row',
                gap: `${baseSpacing * 0.5}rem`,
                fontSize: `${baseFontSize}rem`,
                marginBottom: `${baseSpacing}rem`,
            },
            noteTitleSize: {
                fontSize: `${baseFontSize * 1.2}rem`,
                fontWeight: 'bold',
            },
            noteContentSize: {
                fontSize: `${baseFontSize}rem`,
                lineHeight: `${baseFontSize * 1.4}rem`,
            },
            noteCategorySize: {
                fontSize: `${baseFontSize * 0.9}rem`,
                display: 'flex',
                alignItems: 'center',
                gap: `${baseSpacing * 0.3}rem`,
            }
        };
    }, [windowSize]);
    
    // // Get current styles based on window size
    const styles = getResponsiveStyles();



   useEffect(() => {
        let timeoutId = null;
        
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 150); // Debounce of 150ms
        };
        
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);
    
    const fetchNotes = async() => {
            try {
                // getthe current user
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    window.location.href = '/login';
                    return;
                }
                // make a GET request to fetch notes
                const response = await axios.get("http://localhost:4000/note/get", {
                    params: { user: user._id },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
                    },
                    withCredentials: true, // include credentials in the request
                })
                console.log(response);
                setNotes(response.data);
                setNoteCount(response.data.length);
                sendNotesCount(response.data.length);
                console.log("Notes fetched successfully:", response.data);
            }
            catch(err){
                console.log("Error fetching notes:", err);
            }
        }


    useEffect(() => {
        fetchNotes();
    },[]);

    const handleAddNote = async() => {
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
            console.log("new note: ", newNote);
            const response = await axios.post('http://localhost:4000/note/add', 
            newNote,    
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}` 
            },
            withCredentials: true 
        });
        console.log("response after ",response.data);
        setNotes([...notes, response.data.result]);
        setNoteCount(noteCount + 1); // Increment the note count
        sendNotesCount(noteCount + 1);
        setNewNoteTitle('');
        setNewNoteContent('');
        } catch (err) {
            console.error('Error adding notes:', err);
        }
    }
    
    const categories = ['General', 'Work', 'Personal', 'Study', 'Health'];

    const handleEditNote = async() => {
        
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
            console.log("updated note: ", updatedNote);
            const response = await axios.put(`http://localhost:4000/note/edit/${editingNote._id}`, updatedNote, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
                },
                withCredentials: true // Include credentials in the request
            });
            console.log("response edit",response);
            // Update the notes state with the edited note
            // Filter the notes array to find the note with the matching ID and update it
            setNotes(notes.map(note => note._id === editingNote._id ? response.data.result : note));
            setSelectedNote(response.data.result); // Set the selected note to the updated note
            setEditingNote(null); // Clear the editing note state
            
            
        } catch (err) {
            console.error('Error updating note:', err);
        }
    }

    const handleDeleteNote = async(noteId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                window.location.href = '/login';
                return;
            }
            const response = await axios.delete(`http://localhost:4000/note/delete/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
                },
                withCredentials: true // Include credentials in the request
            });
            console.log("response after delete",response);
            // Filter the notes array to remove the deleted note
            setNotes(notes.filter(note => note._id !== noteId));
            setNoteCount(noteCount - 1); // Decrement the note count
            sendNotesCount(noteCount - 1);
            setSelectedNote(null); // Clear the selected note
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    }



  return (
    <div className='main_content_note' style={styles.mainContainer}>
        <h1 style={styles.title}>Thoughts in progress..</h1>

        {/* Add Note */}
        <div className='add_note_form'>
            <input type='text' placeholder='Note Title' style={styles.formInputs} value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)}/> 
            <textarea placeholder='Note Content' style={styles.formInputs} value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)}/> 
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
    
            <button onClick={handleAddNote}  style={styles.buttons}>Add Note</button>
        </div>



        <div className='notes_layout' style={styles.notesLayout}>
            <div className='notes_list' style={styles.notesList}>
                <ul>
                    {console.log("notes: ", notes)}
                    {notes.length === 0 ? (
                    <li><h2 style={styles.noteTitleSize}>No notes available</h2></li>
                    ) : (
                        
                    notes.map((note) => (
                        <li key={note._id} className={`note_item ${selectedNote?._id === note._id ? 'active' : '' }`} style={{...styles.noteItem, cursor: 'pointer'}} onClick={() => setSelectedNote(note)}>
                        <div className="note_header">
                            <span className="note_title" style={styles.noteTitleSize}>{note.title}</span>
                        </div>
                        </li>
                    ))
                    )}
                </ul>
            </div>
            {/* <div className="note_details">
                {notes.length > 0 ? (
                    <div className="note_content">
                    <p>Title: </p>
                    <p>Description : </p>
                    <p>Category : </p>
                    <p><FaEdit className="note_delete" /> &nbsp; <FaTrash className="note_delete" /></p>
                    
                    </div>
                ) : (
                    <p>No notes selected.</p>
                )}
            </div> */}
            {/* <div className="note_details">
                {selectedNote ? (
                    <div className="note_content">
                    <h2>{selectedNote.title}</h2>
                    <p><strong>Category:</strong> {selectedNote.category}</p>
                    <div className="note-body">
                        {selectedNote.content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                        ))}
                    </div>
                    <div className="note-actions">
                        <button onClick={() => 
                            {setEditingNote(selectedNote);
                            setEditTitle(selectedNote.title);
                            setEditContent(selectedNote.content);
                            setEditCategory(selectedNote.category);}
                        }>
                        <FaEdit /> Edit
                        </button>
                        <button onClick={() => handleDeleteNote(selectedNote._id)}>
                        <FaTrash /> Delete
                        </button>
                    </div>
                    </div>
                ) : (
                    <p>Select a note to view details</p>
                )}
            </div> */}
            <div className="note_details" style={styles.noteDetails}>
                { editingNote ? (
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
                            style={styles.buttons}
                            />
                            {category}
                        </label>
                        ))}
                    </div>
                    <div className="note-actions">
                        <FaEdit onClick={handleEditNote} style={styles.buttons} >Save</FaEdit>
                        <FaTimes onClick={() => setEditingNote(null) }style={styles.buttons}>Cancel</FaTimes>
                    </div>
                    </div>
                ) : selectedNote ? (
                    <div className="note_content">
                    <h2 style={styles.title}>{selectedNote.title}</h2>
                    <p style={styles.noteCategorySize}><strong>Category:</strong><span>{selectedNote.category}</span></p>
                    <div className="note-body">
                        {selectedNote.content?.split('\n').map((line, i) => (
                        <p key={i} style={styles.noteContentSize}>{line}</p>
                        ))}
                    </div>
                    <div className="note-actions">
                        <FaEdit onClick={() => {
                        setEditingNote(selectedNote);
                        setEditTitle(selectedNote.title);
                        setEditContent(selectedNote.content);
                        setEditCategory(selectedNote.category);
                        }} style={styles.buttons} >
                        Edit
                        </FaEdit>
                        <FaTrash onClick={() => handleDeleteNote(selectedNote._id)}  style={styles.buttons}>
                        Delete
                        </FaTrash>
                    </div>
                    </div>
                ) : (
                    <p style={styles.noteContentSize}>Select a note to view details</p>
                )}
                </div>
        </div>
        
    </div>
  )

//     return (
//    <div className='main_content_note'>
//     <h1>MY NOTES</h1>

//     <div className='add_note_form'>
//      <input type='text' placeholder='Note Title' value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
//      <textarea placeholder='Note Content' value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} />
//      <div className='category_radios'>
//       {categories.map((category) => (
//        <label key={category}>
//         <input
//          type="radio"
//          value={category}
//          checked={newNoteCategory === category}
//          onChange={(e) => setNewNoteCategory(e.target.value)}
//         />
//         {category}
//        </label>
//       ))}
//      </div>
//      <button onClick={handleAddNote}>Add Note</button>
//     </div>

//     <div className={layoutClass}>
//      <div className='notes_list'>
//       <ul>
//        {console.log("notes: ", notes)}
//        {notes.length === 0 ? (
//         <li><h2>No notes available</h2></li>
//        ) : (
//         notes.map((note) => (
//          <li key={note._id} className={`note_item ${selectedNote?._id === note._id ? 'active' : ''}`} onClick={() => setSelectedNote(note)}>
//           <div className="note_header">
//            <span className="note_title">{note.title}</span>
//           </div>
//          </li>
//         ))
//        )}
//       </ul>
//      </div>
//      <div className="note_details">
//       {editingNote ? (
//        <div className="note_content">
//         <h2>Edit Note</h2>
//         <label>Title:</label>
//         <input
//          type="text"
//          value={editTitle}
//          onChange={(e) => setEditTitle(e.target.value)}
//         />
//         <label>Content:</label>
//         <textarea
//          type="text"
//          value={editContent}
//          onChange={(e) => setEditContent(e.target.value)}
//         />
//         <div className='category_radios'>
//          {categories.map((category) => (
//           <label key={category}>
//            <input
//             type="radio"
//             value={category}
//             checked={editCategory === category}
//             onChange={(e) => setEditCategory(e.target.value)}
//            />
//            {category}
//           </label>
//          ))}
//         </div>
//         <div className="note-actions">
//          <button onClick={handleEditNote}><FaEdit /> Save</button>
//          <button onClick={() => setEditingNote(null)}><FaTrash /> Cancel</button>
//         </div>
//        </div>
//       ) : selectedNote ? (
//        <div className="note_content">
//         <h2>{selectedNote.title}</h2>
//         <p><strong>Category:</strong> {selectedNote.category}</p>
//         <div className="note-body">
//          {selectedNote.content?.split('\n').map((line, i) => (
//           <p key={i}>{line}</p>
//          ))}
//         </div>
//         <div className="note-actions">
//          <button onClick={() => {
//            setEditingNote(selectedNote);
//            setEditTitle(selectedNote.title);
//            setEditContent(selectedNote.content);
//            setEditCategory(selectedNote.category);
//          }}>
//           <FaEdit /> Edit
//          </button>
//          <button onClick={() => handleDeleteNote(selectedNote._id)}>
//           <FaTrash /> Delete
//          </button>
//         </div>
//        </div>
//       ) : (
//        <p>Select a note to view details</p>
//       )}
//      </div>
//     </div>
//    </div>
//   )
 
}

export default Notes