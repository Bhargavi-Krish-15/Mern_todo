// Todo.jsx allows users to create, view, complete, and delete todo tasks.
// It updates task count and syncs data with the backend using API calls.


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCheck } from "react-icons/fa";
import Create from "./Create";
import "./Todo.css";
import { useNavigate } from 'react-router-dom';

// Responsive root font-size logic (using rem only)
// const BASE_WIDTH = 1440;

// function setResponsiveFontSize() {
//   const scale = Math.min(Math.max(window.innerWidth / BASE_WIDTH, 0.75), 1);
//   document.documentElement.style.fontSize = "1rem"; // Set base font size to 1rem
// }

const Todo = ({ setTodoCount }) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate(); 
  // const [isNarrow, setIsNarrow] = useState(window.innerWidth < 768);

  // Set root font-size on mount and resize
  // useEffect(() => {
  //   setResponsiveFontSize();
  //   // const handleResize = () => {
  //   //     console.log('isNarrow', isNarrow)
  //   //   setIsNarrow(window.innerWidth < 768);
  //   // };
  //   // window.addEventListener("resize", handleResize);
  //   // return () => window.removeEventListener("resize", handleResize);
  //   window.addEventListener("resize", setResponsiveFontSize);
  //   return () => window.removeEventListener("resize", setResponsiveFontSize);
  // }, []);

  // Fetch todos from the server
  const fetchTodos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate('/login');
        return;
      }

      const response = await axios.get("http://localhost:4000/todo/get", {
        params: { user: user._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        withCredentials: true,
      });

      const userTodos = response.data.filter((todo) => todo.user === user._id);
      setTodos(userTodos);
      setTodoCount(userTodos.length);
    } catch (err) {
      console.log("Error fetching todos:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("user");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (task) => {
    setTodos((prevTodos) => [...prevTodos, task]);
    setTodoCount((prev) => prev + 1);
  };

  const handleTodoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        withCredentials: true,
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      setTodoCount((prev) => prev - 1);
    } catch (err) {
      console.log("Error deleting todo:", err);
    }
  };

  const handleTodoComplete = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/todo/complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          withCredentials: true,
        }
      );
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (err) {
      console.log("Error marking todo complete:", err);
    }
  };

  return (
    <div
      className="main_content"
      style={{
        
        padding: "1.25rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: "60rem", 
        margin: "0 auto",   
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Mission: Get stuff done-ish
      </h1>

      <Create
        addTodo={addTodo}
        todoCount={todos.length}
        setTodoCount={setTodoCount}
      />

      <ul>
        {todos.length === 0 ? (
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                color: "#6a6a6a",
                padding: "1.25rem",
              }}
            >
              No tasks available..
            </h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="todo_list_item"
              style={{
                padding: "0.4rem",
                // border: "0.0625rem solid #ddd", 
                borderRadius: "0.5rem", 
                // marginBottom: "0.5rem",
              }}
            >
              <div
                className={`new_todo opacity ${
                  todo.completed ? "completed_todo" : "incomplete_todo"
                }`}
              >
                <div
                  className="todo_content"
                  style={{
                    // display - default: flex - for all screen sizes
                    display: "flex",
                    justifyContent: "space-between",
                    // specifies the default alignment for items inside a flexbox or grid container.
                    alignItems: "center",
                    flexWrap: "wrap", 
                    gap: "0.5rem",
                    // how words should break when reaching the end of a line.
                    wordBreak: "break-word",
                  }}
                >
                  <div
                    className="todo_title"
                    style={{
                      fontSize: "1rem", 
                      flex: "1 1 auto",
                      whiteSpace: "normal",
                      // text line thorugh if completed
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.task.toUpperCase()}
                  </div>

                  <div
                    className="todo_icons"
                    style={{
                      fontSize: "1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem", 
                    }}
                  >
                    {!todo.completed && (
                      <>
                        <FaCheck onClick={() => handleTodoComplete(todo._id)} />
                        <FaTrash onClick={() => handleTodoDelete(todo._id)} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todo;
