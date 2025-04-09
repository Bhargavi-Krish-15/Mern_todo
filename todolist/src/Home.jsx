import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";

const Home = () => {
  // store todos state
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      // get request to fetch todos from server
      const response = await axios.get("http://localhost:4000/get");
      // update the state with the fetched todos
      setTodos(response.data);
    } catch (err) {
      console.log("Error fetching todos:", err);
    }
  };
  // fetch todos from server when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []); //empty array - run only once when the component mounts

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
      const result = await axios.delete(`http://localhost:4000/delete/${id}`);
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
      const result = await axios.put(`http://localhost:4000/complete/${id}`);
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
      <h2>Todo List</h2>
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
              {/* Display whether the task is completed or not */}
              {todo.completed ? <h3>Completed</h3> : <h3>Not Completed</h3>}
              {/* Display the task description */}
              <p>{todo.task}</p>
              {/* delete the task */}
              <button type="button" onClick={() => handleTodoDelete(todo._id)}>
                Delete
              </button>
              {/* To mark task as complete (only if not already completed) */}
              {!todo.completed ? (
                <button
                  type="button"
                  onClick={() => handleTodoComplete(todo._id)}
                >
                  Complete
                </button>
              ) : null}
            </div>
          ))
        )
      }
    </div>
  );
};
export default Home;
