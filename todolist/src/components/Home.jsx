import React, { useState, useEffect, use } from "react";
import Create from "./Create";
import axios from "axios";
import { FaTrash, FaCheck } from 'react-icons/fa';

const Home = () => {
  // store todos state
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState("");

  //check if user is logged in
  useEffect(() => {
    const user_str = localStorage.getItem("user");
    // parse the user ID from local storage
    if (!user_str) {
      console.error("User not Logged in");
      window.location.href = '/login';
      return;
    }
    const user = JSON.parse(user_str);
    setUsername(user.username);
  },[]);

  const fetchTodos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        window.location.href = '/login';
        return;
      }
      // get request to fetch todos from server
      const response = await axios.get("http://localhost:4000/todo/get", {
        params: { user: user._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
        },
        withCredentials: true, // include credentials in the request
      });
      // update the state with the fetched todos
      console.log(response);
      // setTodos(response.data);
      const userTodos = response.data.filter(todo => todo.user === user._id);
      setTodos(userTodos);
      console.log("Todos fetched successfully:", response.data);
    } catch (err) {
      console.log("Error fetching todos:", err);
      // error message:
      if(err.response && err.response.status === 401){
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
  };
  // fetch todos from server when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []); //empty array - run only once when the component mounts

  // logout function
  const handleLogout = async () => {
    try{
      const result = await axios.get("http://localhost:4000/logout", {
        withCredentials: true,
      });
      console.log(result);
      // remove user from local storage
      localStorage.removeItem("user");
      // redirect to login page
      window.location.href = "/login";
    }
    catch (err) {
      console.log("Error logging out:", err);
    }
  }


  // Add new todo to existing list
  // This function is passed as a prop to the Create component
  // It will be called when a new todo is created
  // The task parameter is the new todo that was added
  // The function updates the state by adding the new todo to the existing list
  // The setTodos function is used to update the state
  // It takes a function as an argument that receives the previous state (prevTodos)
  // and returns a new array with the new todo added to it
  // This ensures that the state is updated correctly even if there are multiple updates happening at the same time
  const addTodo = async (task) => {
    setTodos((prevTodos) => [...prevTodos, task]);
  };

  // deleting a todo
  const handleTodoDelete = async (id) => {
    try {
      // delete request to remove the todo by its id
      const result = await axios.delete(`http://localhost:4000/todo/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true, // include credentials in the request
      });
      console.log(result);
      // update the state by filtering out the deleted todo
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log("Error deleting todo:", err);
    }
  };

  // marking a todo as completed
  const handleTodoComplete = async (id) => {
    try {
      // put request to mark the todo as completed by its id
      const result = await axios.put(`http://localhost:4000/todo/complete/${id}`,{}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true,
      });
      console.log(result);
      // update the state by marking the todo as completed, if the provided id matches
      // ...todo - spread operator to copy the existing todo properties
      // completed: true - update the completed property to true
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <div className="title_heading">
        <h3 className="welcome_user">Welcome {username}</h3>
        <button className="logout_button" onClick={handleLogout} >Log out</button>
      </div>
      <div className="todo_container"> 
        <h2 className="todo_heading">Todo List</h2>
        {/* For creating new todos */}
        <Create addTodo={addTodo} />
        <br />
        {
          // if there are no todos, display a message
          todos.length === 0 ? (
            <div>
              <h2>No tasks available</h2>
            </div>
          ) : (
            todos.map((todo) => (
              //The key={todo._id} ensures that React can uniquely identify each element in the list. This is critical for React's reconciliation process when updating the DOM.
              //The id={todo._id} correctly assigns the value of todo._id to the HTML attribute without unnecessary quotes.
              <div id={todo._id} className="todo" key={todo._id}>
                
                {/* Display the task description */}
                <p className="todo_title">{todo.task.toUpperCase()}</p>
                {/* Display whether the task is completed or not */}
                {todo.completed ? <h3>Completed</h3> : <h3>Incomplete</h3>}
                {/* delete the task */}
                <div className="icon-container">
                  
                    {/* <FaTrash/> */}
                  {/* </button> */}
                  {/* To mark task as complete (only if not already completed) */}
                  {!todo.completed ? (
                    <FaCheck
                      type="button"
                      onClick={() => handleTodoComplete(todo._id)}
                    />
                      // <FaCheck />
                    // </FaCheck>
                  ) : null}
                  <FaTrash type="button" onClick={() => handleTodoDelete(todo._id)} />
                 </div> 
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};
export default Home;
