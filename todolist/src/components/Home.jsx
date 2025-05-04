// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Notes from "./notes/Notes";
// import Todo from "./todos/Todo";

// const Home = () => {
//   const [username, setUsername] = useState("");
//   const [activeContent, setActiveContent] = useState("todos");
//   const [todoCount, setTodoCount] = useState(0);
//   const [notesCount, setNotesCount] = useState(0);

//   // Receive count from Notes
// //   const handleCountFromNotes = (count) => {
// //     setNotesCount(count);
// //   };

//   // Check if user is logged in
//   useEffect(() => {
//     const user_str = localStorage.getItem("user");
//     if (!user_str) {
//       console.error("User not Logged in");
//       window.location.href = "/login";
//       return;
//     }
//     const user = JSON.parse(user_str);
//     setUsername(user.username);
//   }, []);

//   // Logout handler
//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:4000/logout", {
//         withCredentials: true,
//       });
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     } catch (err) {
//       console.log("Error logging out:", err);
//     }
//   };

//   return (
//     <div className="new_home">
//       <div className="left_bar opacity">
//         <h2>{username}'s Notebook</h2>
//         <ul>
//           <button className="new_logout" onClick={handleLogout}>
//             Log out
//           </button>
//           <li
//             className={activeContent === "todos" ? "active_tab" : ""}
//             onClick={() => setActiveContent("todos")}
//           >
//             Todo List ({todoCount})
//           </li>
//           <li
//             className={activeContent === "notes" ? "active_tab" : ""}
//             onClick={() => setActiveContent("notes")}
//           >
//             Notes ({notesCount})
//           </li>
//         </ul>
//       </div>

//       {activeContent === "todos" && (
//         <Todo todoCount={todoCount} setTodoCount={setTodoCount} />
//       )}

//       {activeContent === "notes" && (
//         <Notes notesCount={notesCount} setNotesCount={setNotesCount}  /*sendNotesCount={handleCountFromNotes}*/ />
//       )}
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Notes from "./notes/Notes";
// import Todo from "./todos/Todo";
// import MoodTracker from "./moodtracker/MoodTracker";
// import Pomodoro from "./pomodoro/Pomodoro";
// // import { useNotes } from "./notes/NotesContext";

// // Returns scale based on window width relative to a base design width
// const getScale = () => {
//   const baseWidth = 1440;
//   const scale_factor = window.innerWidth / baseWidth;
//   return Math.min(scale_factor, 1); // prevent upscaling on large screens
// };

// const Home = () => {
//   const [username, setUsername] = useState("");
//   const [activeContent, setActiveContent] = useState("todos");
//   const [todoCount, setTodoCount] = useState(0);
//   const [notesCount, setNotesCount] = useState(null);
//   const [scale, setScale] = useState(getScale());

//   // Receive count from Notes
//   const handleCountFromNotes = (count) => {
//     setNotesCount(count);
//   };

//     // const { notesCount } = useNotes();

//   // Check if user is logged in
//   useEffect(() => {
//     const user_str = localStorage.getItem("user");
//     if (!user_str) {
//       console.error("User not Logged in");
//       window.location.href = "/login";
//       return;
//     }
//     const user = JSON.parse(user_str);
//     setUsername(user.username);
    
//     // Add resize event listener
//     const handleResize = () => {
//       setScale(getScale());
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Logout handler
//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:4000/logout", {
//         withCredentials: true,
//       });
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     } catch (err) {
//       console.log("Error logging out:", err);
//     }
//   };
  
//   const navItemStyle = {
//     margin: `${0.75 * scale}rem 0`,
//     // padding: `${1.3 * scale}rem`,
//     cursor: 'pointer',
//     fontSize: `${1.2 * scale}rem`
//   };
  
//   const activeTabStyle = {
//     ...navItemStyle,
//     color: '#86a018',
//     fontWeight: 'bold'
//   };
  
 

//   return (
//     <div className="new_home" style={{ display: 'flex', minHeight: '100vh', backgroundImage: 'url("pattern.png")' }}>
//       <div className="left_bar" style={{
//         width: `${15 * scale}rem`,
//         padding: `${1.25 * scale}rem`,
//         minHeight: '100vh',
//         backgroundColor: '#f0f0f0',
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         <h2 style={{
//           marginBottom: `${1.5 * scale}rem`,
//           fontSize: `${1.75 * scale}rem`,
//           color: '#86a018'
//         }}>{username}'s Notebook</h2>
//         <MoodTracker />
    
//         {/* Logout button */}
//         <button 
//           className="new_logout" 
//           style={{
//             backgroundColor: '#a4c031',
//             color: 'white',
//             padding: `${0.625 * scale}rem`,
//             border: 'none',
//             cursor: 'pointer',
//             width: '100%',
//             fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             marginBottom: `${1.5 * scale}rem`,
//             fontSize: `${1 * scale}rem`,
//             boxShadow: `rgba(0, 0, 0, 0.2) ${0.5 * scale}rem ${1 * scale}rem ${1 * scale}rem ${-0.75 * scale}rem`,
//             borderRadius: `${0.25 * scale}rem`
//           }}
//           onClick={handleLogout}
//         >
//           Log out
//         </button>
        
//         <ul style={{
//           listStyle: 'none',
//           padding: 0,
//           margin: `${1 * scale}rem 0`
//         }}>
//           <li 
//             style={activeContent === "todos" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("todos")}
//           >
//             Todo List ({todoCount})
//           </li>
//           <li 
//             style={activeContent === "notes" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("notes")}
//           >
//             Notes {notesCount}
//           </li>
//           <li 
//             style={activeContent === "pomodoro" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("pomodoro")}
//           >
//             Pomodoro
//           </li>
//         </ul>
//       </div>
      
//       <div className="main_content" style={{
//         flex: 1,
//         padding: `${1.25 * scale}rem`,
//         overflow: 'auto'
//       }}>
//         {activeContent === "todos" && (
//           <Todo setTodoCount={setTodoCount} />
//         )}
//         {activeContent === "notes" && (
//           <Notes sendNotesCount={handleCountFromNotes} />
//         )}
//         {activeContent === "pomodoro" && (
//           <Pomodoro />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Notes from "./notes/Notes";
// import Todo from "./todos/Todo";
// import MoodTracker from "./moodtracker/MoodTracker";
// import Pomodoro from "./pomodoro/Pomodoro";

// // ✅ Responsive root font-size logic (same as Todo.jsx)
// const BASE_WIDTH = 1440;

// function setResponsiveFontSize() {
//   const scale = Math.min(Math.max(window.innerWidth / BASE_WIDTH, 0.75), 1);
//   document.documentElement.style.fontSize = `${scale}rem`;
// }

// const Home = () => {
//   const [username, setUsername] = useState("");
//   const [activeContent, setActiveContent] = useState("todos");
//   const [todoCount, setTodoCount] = useState(0);
//   const [notesCount, setNotesCount] = useState(null);

//   // Receive count from Notes
//   const handleCountFromNotes = (count) => {
//     setNotesCount(count);
//   };

//   // Check user login and handle root font size
//   useEffect(() => {
//     const user_str = localStorage.getItem("user");
//     if (!user_str) {
//       console.error("User not Logged in");
//       window.location.href = "/login";
//       return;
//     }

//     const user = JSON.parse(user_str);
//     setUsername(user.username);

//     // Set and update root font-size based on screen width
//     setResponsiveFontSize();
//     window.addEventListener("resize", setResponsiveFontSize);
//     return () => window.removeEventListener("resize", setResponsiveFontSize);
//   }, []);

//   // Logout handler
//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:4000/logout", {
//         withCredentials: true,
//       });
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     } catch (err) {
//       console.log("Error logging out:", err);
//     }
//   };

//   // Static rem-based styles
//   const navItemStyle = {
//     margin: "0.75rem 0",
//     cursor: "pointer",
//     fontSize: "1.2rem",
//   };

//   const activeTabStyle = {
//     ...navItemStyle,
//     color: "#86a018",
//     fontWeight: "bold",
//   };

//   return (
//     <div
//       className="new_home"
//       style={{
//         display: "flex",
//         flexWrap: "wrap", // 🔧 Allows responsive stacking
//         minHeight: "100vh",
//         backgroundImage: 'url("pattern.png")',
//         fontSize: "1rem", // Default rem base (scaled via JS)
        
//       }}
//     >
//       {/* Sidebar */}
//       <div
//         className="left_bar"
//         style={{
//           flex: "0 0 14rem", // Responsive width
//           padding: "1.25rem",
//           // minHeight: "100vh",
//           backgroundColor: "#f0f0f0",
//           display: "flex",
//           flexDirection: "column",
//           boxSizing: "border-box",
//           // minWidth: "15rem", // Prevents overflow on small screens
//           maxWidth: "16rem",
//         }}
//       >
//         <h2
//           style={{
//             marginBottom: "1.5rem",
//             fontSize: "1.75rem",
//             color: "#86a018",
//             wordBreak: "break-word",
//           }}
//         >
//           {username}'s Notebook
//         </h2>

//         <MoodTracker />

//         <button
//           className="new_logout"
//           style={{
//             backgroundColor: "#a4c031",
//             color: "white",
//             padding: "0.625rem",
//             border: "none",
//             cursor: "pointer",
//             width: "100%",
//             fontFamily:
//               '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             marginBottom: "1.5rem",
//             fontSize: "1rem",
//             boxShadow: "rgba(0, 0, 0, 0.2) 0.5rem 1rem 1rem -0.75rem",
//             borderRadius: "0.25rem",
//           }}
//           onClick={handleLogout}
//         >
//           Log out
//         </button>

//         <ul
//           style={{
//             listStyle: "none",
//             padding: 0,
//             margin: "1rem 0",
//           }}
//         >
//           <li
//             style={activeContent === "todos" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("todos")}
//           >
//             Todo List ({todoCount})
//           </li>
//           <li
//             style={activeContent === "notes" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("notes")}
//           >
//             Notes {notesCount}
//           </li>
//           <li
//             style={activeContent === "pomodoro" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("pomodoro")}
//           >
//             Pomodoro
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div
//         className="main_content"
//         style={{
//           flex: "3 1 32rem", // Main content grows larger
//           padding: "1.25rem",
//           overflow: "auto",
//           boxSizing: "border-box",
//           maxWidth: "100%", 
//           minWidth: "0",
//         }}
//       >
//         {activeContent === "todos" && <Todo setTodoCount={setTodoCount} />}
//         {activeContent === "notes" && (
//           <Notes sendNotesCount={handleCountFromNotes} />
//         )}
//         {activeContent === "pomodoro" && <Pomodoro />}
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Notes from "./notes/Notes";
// import Todo from "./todos/Todo";
// import MoodTracker from "./moodtracker/MoodTracker";
// import Pomodoro from "./pomodoro/Pomodoro";

// // Set rem scaling
// const BASE_WIDTH = 1440;
// function setResponsiveFontSize() {
//   const scale = Math.min(Math.max(window.innerWidth / BASE_WIDTH, 0.75), 1);
//   document.documentElement.style.fontSize = `${scale}rem`;
// }

// const Home = () => {
//   const [username, setUsername] = useState("");
//   const [activeContent, setActiveContent] = useState("todos");
//   const [todoCount, setTodoCount] = useState(0);
//   const [notesCount, setNotesCount] = useState(null);

//   useEffect(() => {
//     const user_str = localStorage.getItem("user");
//     if (!user_str) {
//       window.location.href = "/login";
//       return;
//     }

//     const user = JSON.parse(user_str);
//     setUsername(user.username);

//     setResponsiveFontSize();
//     window.addEventListener("resize", setResponsiveFontSize);
//     return () => window.removeEventListener("resize", setResponsiveFontSize);
//   }, []);

//   const handleCountFromNotes = (count) => {
//     setNotesCount(count);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:4000/logout", {
//         withCredentials: true,
//       });
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     } catch (err) {
//       console.log("Error logging out:", err);
//     }
//   };

//   const navItemStyle = {
//     margin: "0.75rem 0",
//     cursor: "pointer",
//     fontSize: "1.2rem",
//   };

//   const activeTabStyle = {
//     ...navItemStyle,
//     color: "#86a018",
//     fontWeight: "bold",
//   };

//   return (
//     <div
//       className="new_home"
//       style={{
//         display: "flex", // ✅ Always side by side
//         flexDirection: "row",
//         overflowX: "auto", // ✅ Allow scroll on narrow screens
//         minHeight: "100vh",
//         backgroundImage: 'url("pattern.png")',
//         fontSize: "1rem",
//       }}
//     >
//       {/* Sidebar */}
//       <div
//         className="left_bar"
//         style={{
//           width: "16rem", // ✅ Always 16rem
//           flexShrink: 0, // ✅ Prevent shrinking
//           padding: "1.25rem",
//           backgroundColor: "#f0f0f0",
//           display: "flex",
//           flexDirection: "column",
//           boxSizing: "border-box",
//         }}
//       >
//         <h2
//           style={{
//             marginBottom: "1.5rem",
//             fontSize: "1.75rem",
//             color: "#86a018",
//             wordBreak: "break-word",
//           }}
//         >
//           {username}'s Notebook
//         </h2>

//         <MoodTracker />

//         <button
//           style={{
//             backgroundColor: "#a4c031",
//             color: "white",
//             padding: "0.625rem",
//             border: "none",
//             cursor: "pointer",
//             width: "100%",
//             fontFamily:
//               '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             marginBottom: "1.5rem",
//             fontSize: "1rem",
//             boxShadow: "rgba(0, 0, 0, 0.2) 0.5rem 1rem 1rem -0.75rem",
//             borderRadius: "0.25rem",
//           }}
//           onClick={handleLogout}
//         >
//           Log out
//         </button>

//         <ul
//           style={{
//             listStyle: "none",
//             padding: 0,
//             margin: "1rem 0",
//           }}
//         >
//           <li
//             style={activeContent === "todos" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("todos")}
//           >
//             Todo List ({todoCount})
//           </li>
//           <li
//             style={activeContent === "notes" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("notes")}
//           >
//             Notes {notesCount}
//           </li>
//           <li
//             style={activeContent === "pomodoro" ? activeTabStyle : navItemStyle}
//             onClick={() => setActiveContent("pomodoro")}
//           >
//             Pomodoro
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div
//         className="main_content"
//         style={{
//           flex: 1,
//           padding: "1.25rem",
//           overflow: "auto",
//           boxSizing: "border-box",
//           minWidth: "20rem", // ✅ Prevents squishing
//         }}
//       >
//         {activeContent === "todos" && <Todo setTodoCount={setTodoCount} />}
//         {activeContent === "notes" && (
//           <Notes sendNotesCount={handleCountFromNotes} />
//         )}
//         {activeContent === "pomodoro" && <Pomodoro />}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Notes from "./notes/Notes";
import Todo from "./todos/Todo";
import MoodTracker from "./moodtracker/MoodTracker";
import Pomodoro from "./pomodoro/Pomodoro";

// More aggressive scaling (down to 0.5x)
const BASE_WIDTH = 1440;

function setResponsiveFontSize() {
  const scale = Math.min(Math.max(window.innerWidth / BASE_WIDTH, 0.5), 1);
  document.documentElement.style.fontSize = `${scale}rem`; // this actually updates <html>
}

const Home = () => {
  const [username, setUsername] = useState("");
  const [activeContent, setActiveContent] = useState("todos");
  const [todoCount, setTodoCount] = useState(0);
  const [notesCount, setNotesCount] = useState(null);

  useEffect(() => {
    const user_str = localStorage.getItem("user");
    if (!user_str) {
      window.location.href = "/login";
      return;
    }

    const user = JSON.parse(user_str);
    setUsername(user.username);

    setResponsiveFontSize();
    window.addEventListener("resize", setResponsiveFontSize);
    return () => window.removeEventListener("resize", setResponsiveFontSize);
  }, []);

  const handleCountFromNotes = (count) => {
    setNotesCount(count);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (err) {
      console.log("Error logging out:", err);
    }
  };

  const navItemStyle = {
    margin: "0.75rem 0",
    cursor: "pointer",
    fontSize: "1.2rem",
  };

  const activeTabStyle = {
    ...navItemStyle,
    color: "#86a018",
    fontWeight: "bold",
  };

  return (
    <div
      className="new_home"
      style={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        minHeight: "100vh",
        backgroundImage: 'url("pattern.png")',
        fontSize: "1rem",
      }}
    >
      {/* Sidebar */}
      <div
        className="left_bar"
        style={{
          width: "14rem", // ⬅️ Scales with rem and actually gets narrower on small screens
          flexShrink: 0,
          padding: "1.25rem",
          backgroundColor: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.75rem",
            color: "#86a018",
            wordBreak: "break-word",
          }}
        >
          {username}'s Notebook
        </h2>

        <MoodTracker />

        <button
          className="new_logout"
          style={{
            backgroundColor: "#a4c031",
            color: "white",
            padding: "0.625rem",
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontFamily:
              '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
            marginBottom: "1.5rem",
            fontSize: "1rem",
            boxShadow: "rgba(0, 0, 0, 0.2) 0.5rem 1rem 1rem -0.75rem",
            borderRadius: "0.25rem",
          }}
          onClick={handleLogout}
        >
          Log out
        </button>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "1rem 0",
          }}
        >
          <li
            style={activeContent === "todos" ? activeTabStyle : navItemStyle}
            onClick={() => setActiveContent("todos")}
          >
            Todo List ({todoCount})
          </li>
          <li
            style={activeContent === "notes" ? activeTabStyle : navItemStyle}
            onClick={() => setActiveContent("notes")}
          >
            Notes {notesCount}
          </li>
          <li
            style={activeContent === "pomodoro" ? activeTabStyle : navItemStyle}
            onClick={() => setActiveContent("pomodoro")}
          >
            Pomodoro
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="main_content"
        style={{
          flex: 1,
          padding: "1.25rem",
          overflow: "auto",
          boxSizing: "border-box",
          minWidth: "20rem",
        }}
      >
        {activeContent === "todos" && <Todo setTodoCount={setTodoCount} />}
        {activeContent === "notes" && (
          <Notes sendNotesCount={handleCountFromNotes} />
        )}
        {activeContent === "pomodoro" && <Pomodoro />}
      </div>
    </div>
  );
};

export default Home;


