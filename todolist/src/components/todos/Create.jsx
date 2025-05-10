import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ addTodo, setTodoCount, todoCount }) => {
  const [task, setTask] = useState('');

  const handleAddTodo = async () => {
    try {
      const user_str = localStorage.getItem('user');
      if (!user_str) {
        console.error('User not Logged in');
        return;
      }
      const user = JSON.parse(user_str);

      const response = await axios.post(
        'http://localhost:4000/todo/add',
        {
          task: task,
          user: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          withCredentials: true,
        }
      );

      console.log('Task added successfully:', response.data);
      addTodo(response.data.result);
      setTodoCount(todoCount + 1);
      setTask('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div
    className="create_form"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1rem',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <input
      type="text"
      placeholder="Enter a new task"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        flex: '1 1 15rem', // allows shrinking!
        minWidth: '0',
        borderRadius: '0.5rem',
        borderBottom: '2px solid #a4c031',
        boxSizing: 'border-box',
      }}
    />
    <button
      type="button"
      onClick={handleAddTodo}
      style={{
        padding: '0.75rem 1.25rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'black',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      Add
    </button>
  </div>
  );
};

export default Create;

