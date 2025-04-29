import React, {useState} from 'react'
import axios from 'axios'

const Create = ({ addTodo, setTodoCount, todoCount }) => {
    const [task, setTask] = useState('');

    const handleAddTodo = async() => {
    try {

        // Get the user ID from local storage
        const user_str = localStorage.getItem('user');
        // Parse the user ID from local storage
        if (!user_str) {
            console.error('User not Logged in');
            return;
        }
        const user = JSON.parse(user_str);

        // Make a POST request to add the new task
        const response = await axios.post('http://localhost:4000/todo/add', {
            task: task, // Send the task as part of the request body
            user: user._id // Send the user ID as part of the request body, 
        },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
            },
            withCredentials: true // Include credentials in the request
        });

        console.log('Task added successfully:', response.data);
        addTodo(response.data.result); // Call the addTodo function to update the state
        setTodoCount(todoCount + 1); // Increment the todo count
        // Clear the input field after adding the task
        setTask('');

        // // Reload the page to fetch the updated list of tasks
        // location.reload();
        } catch (err) {
        console.error('Error adding task:', err); // Log any errors
        }
    }

  return (
    <div className='create_form'> 
        {/* For entering a new task */}
        <input type="text" placeholder="Enter a new task" value={task} onChange={(e) => setTask(e.target.value)}/>
        {/* To add the new task */}
        <button type="button" onClick={handleAddTodo}>Add</button>
    </div>
  )
}

export default Create