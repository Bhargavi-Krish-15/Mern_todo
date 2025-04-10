import React, {useState} from 'react'
import axios from 'axios'

const Create = ({ addTodo }) => {
    const [task, setTask] = useState('');

    const handleAddTodo = async() => {
    try {
        // Make a POST request to add the new task
        const response = await axios.post('http://localhost:4000/add', {
            task: task, // Send the task as part of the request body
        });

        console.log('Task added successfully:', response.data);
        addTodo(response.data.result); // Call the addTodo function to update the state
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