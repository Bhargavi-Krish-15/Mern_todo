// Home.jsx is the main dashboard component shown after login.
// It displays the sidebar and dynamically switches between Todos, Notes, and Pomodoro views.


import React, { useState, useEffect } from "react";
import axios from "axios";
import Notes from "../notes/Notes";
import Todo from "../todos/Todo";
import MoodTracker from "../moodtracker/MoodTracker";
import Pomodoro from "../pomodoro/Pomodoro";
import { useNavigate } from "react-router-dom";
//  usenotes is a custom hook that provides access to the notes context
import { useNotes } from "../notes/NotesContext";

const Home = () => {
  const [username, setUsername] = useState("");
  const [activeContent, setActiveContent] = useState("todos");
  const [todoCount, setTodoCount] = useState(0);
  // const [notesCount, setNotesCount] = useState(null);

  // navigate is a hook from react-router-dom that allows you to programmatically navigate
  const navigate = useNavigate();
  // notesCount - holds the number of notes
  const { notesCount } = useNotes();
  console.log("notesCount", notesCount);

  useEffect(() => {
    const user_str = localStorage.getItem("user");
    if (!user_str) {
      // window.location.href = "/login";
      navigate("/login");
      return;
    }

    //  user_str is a stringified object, so we need to parse it
    const user = JSON.parse(user_str);
    setUsername(user.username);

    // setResponsiveFontSize();
    // window.addEventListener("resize", setResponsiveFontSize);
    // return () => window.removeEventListener("resize", setResponsiveFontSize);
    // fetchNotes();
  }, []);


  //  logout function
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log("Error logging out:", err);
    }
  };

  //  navItemStyle - styles for the navigation items
  const navItemStyle = {
    margin: "0.75rem 0",
    cursor: "pointer",
    fontSize: "1.2rem",
  };

  // activeTabStyle - styles for the active tab
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
        backgroundImage: 'url("/Mern_todo/pattern.png")',
        fontSize: "1rem",
      }}
    >
      {/* Sidebar */}
      <div
        className="left_bar"
        style={{
          width: "14rem",
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
          {username}'s Hub
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
            Notes ({notesCount})
          </li>
          <li
            style={activeContent === "pomodoro" ? activeTabStyle : navItemStyle}
            onClick={() => setActiveContent("pomodoro")}
          >
            Pomodoro
          </li>
        </ul>
      </div>

      {/* Main Content where we show notes, todos,etc */}
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
        {activeContent === "notes" && <Notes />}
        {activeContent === "pomodoro" && <Pomodoro />}
      </div>
    </div>
  );
};

export default Home;
