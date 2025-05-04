// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash, FaCheck } from "react-icons/fa";
// import Create from "./Create";
// import "./Todo.css";

// // returns scale based on window width relative to a base design width
// const getScale = () => {
//   // Base width for design
//   const baseWidth = 1440;
//   // Calculate scale factor based on current window width
//   const scale_factor = window.innerWidth / baseWidth;
//   // prevent upscaling on large screens
//   return Math.min(scale_factor, 1); 
// };

// const Todo = ({ setTodoCount }) => {
//   const [todos, setTodos] = useState([]);
//   const [scale, setScale] = useState(getScale());

//   // Fetch todos from the server
//   const fetchTodos = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         window.location.href = "/login";
//         return;
//       }

//       const response = await axios.get("http://localhost:4000/todo/get", {
//         params: { user: user._id },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         withCredentials: true,
//       });

//       const userTodos = response.data.filter((todo) => todo.user === user._id);
//       setTodos(userTodos);
//       setTodoCount(userTodos.length);
//     } catch (err) {
//       console.log("Error fetching todos:", err);
//       if (err.response && err.response.status === 401) {
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//       }
//     }
//   };

//   // Fetch todos on mount
//   // and set up resize event listener
//   // to update scale for responsive design
//   // and set up resize event listener
//   useEffect(() => {
//     fetchTodos();

//     // Update scale on resize
//     const handleResize = () => {
//       setScale(getScale());
//     };
//     // Add resize event listener
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const addTodo = (task) => {
//     setTodos((prevTodos) => [...prevTodos, task]);
//     setTodoCount((prev) => prev + 1);
//   };

//   const handleTodoDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4000/todo/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         withCredentials: true,
//       });
//       setTodos(todos.filter((todo) => todo._id !== id));
//       setTodoCount((prev) => prev - 1);
//     } catch (err) {
//       console.log("Error deleting todo:", err);
//     }
//   };

//   const handleTodoComplete = async (id) => {
//     try {
//       await axios.put(
//         `http://localhost:4000/todo/complete/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//           withCredentials: true,
//         }
//       );
//       setTodos(
//         todos.map((todo) =>
//           todo._id === id ? { ...todo, completed: true } : todo
//         )
//       );
//     } catch (err) {
//       console.log("Error marking todo complete:", err);
//     }
//   };

//   return (
//     <div
//       className="main_content"
//       style={{
//         padding: `${1.25 * 1}rem`, // 20px → 1.25rem
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <h1 style={{ fontSize: `${2 * 1}rem`, marginBottom: `${1 * 1}rem` }}>
//         Mission: Get stuff done-ish
//       </h1>

//       <Create
//         addTodo={addTodo}
//         todoCount={todos.length}
//         setTodoCount={setTodoCount}
//         scale={1}
//       />

//       <ul>
//         {todos.length === 0 ? (
//           <div>
//             <h2 style={{ fontSize: `${1.25 * scale}rem`, color: '#6a6a6a',  padding: `${1.25 * scale}rem` }}>No tasks available..</h2>
//           </div>
//         ) : (
//           todos.map((todo) => (
//             <div
//               key={todo._id}
//               className="todo_list_item "
//               style={{
//                 padding: `${0.625 * scale}rem`,
//               }}
//             >
//               <div
//                 className={`new_todo opacity ${
//                   todo.completed ? "completed_todo" : "incomplete_todo"
//                 }`}
//               >
//                 <div
//                   className="todo_content"
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     className="todo_title"
//                     style={{
//                       fontSize: `${1.25 * scale}rem`, // 20px → 1.25rem
//                       textDecoration: todo.completed ? "line-through" : "none",
//                       color: "#4f4f4f",
//                     }}
//                   >
//                     {todo.task.toUpperCase()}
//                   </div>

//                   <div
//                     className="todo_icons"
//                     style={{
//                       fontSize: `${1.25 * scale}rem`,
//                       cursor: "pointer",
//                     }}
//                   >
//                     {!todo.completed && (
//                       <>
//                         <FaCheck
//                           onClick={() => handleTodoComplete(todo._id)}
//                           style={{ marginRight: `${0.75 * scale}rem` }} // 12px → 0.75rem
//                         />
//                         <FaTrash onClick={() => handleTodoDelete(todo._id)} />
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Todo;


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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap", // 🔧 Let icon + title wrap
                    gap: "0.5rem",
                    wordBreak: "break-word",
                  }}
                >
                  <div
                    className="todo_title"
                    style={{
                      fontSize: "1rem", // ✅ stays responsive thanks to root font-size
                      flex: "1 1 auto",
                      whiteSpace: "normal",
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
