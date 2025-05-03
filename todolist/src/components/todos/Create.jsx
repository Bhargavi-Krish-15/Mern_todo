// // import React, {useState} from 'react'
// // import axios from 'axios'
// // import './Todo.css'
// // import '../../App.css';


// // const Create = ({ addTodo, setTodoCount, todoCount, scale }) => {
// //     const [task, setTask] = useState('');

// //     const handleAddTodo = async() => {
// //     try {

// //         // Get the user ID from local storage
// //         const user_str = localStorage.getItem('user');
// //         // Parse the user ID from local storage
// //         if (!user_str) {
// //             console.error('User not Logged in');
// //             return;
// //         }
// //         const user = JSON.parse(user_str);

// //         // Make a POST request to add the new task
// //         const response = await axios.post('http://localhost:4000/todo/add', {
// //             task: task, // Send the task as part of the request body
// //             user: user._id // Send the user ID as part of the request body, 
// //         },{
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem('access_token')}` // Add token
// //             },
// //             withCredentials: true // Include credentials in the request
// //         });

// //         console.log('Task added successfully:', response.data);
// //         addTodo(response.data.result); // Call the addTodo function to update the state
// //         setTodoCount(todoCount + 1); // Increment the todo count
// //         // Clear the input field after adding the task
// //         setTask('');

// //         // // Reload the page to fetch the updated list of tasks
// //         // location.reload();
// //         } catch (err) {
// //         console.error('Error adding task:', err); // Log any errors
// //         }
// //     }

// //   return (
// //     <div className='create_form'> 
// //         {/* For entering a new task */}
// //         <input
// //           type="text"
// //           placeholder="Enter a new task"
// //           value={task}
// //           onChange={(e) => setTask(e.target.value)}
// //           // style={{
// //           //   width: pxToRem(300 * scale),
// //           //   padding: pxToRem(10 * scale),
// //           //   border: `${pxToRem(3 * scale)} solid rgb(27, 27, 27)`,
// //           //   borderBottom: `${pxToRem(3 * scale)} solid #a4c031`
// //           // }}
// //         />

// //         {/* To add the new task */}
// //         <button type="button" onClick={handleAddTodo} 
// //         // style={{
// //       // padding: pxToRem(10 * scale),
// //       // border: "none",
// //       // backgroundColor: "rgb(50, 50, 50)",
// //       // color: "white",
// //       // cursor: "pointer",
// //       // marginLeft: pxToRem(10 * scale),
// //       // borderRadius: pxToRem(3 * scale)
// //     // }}
// //     >Add</button>
// //     </div>
// //   )
// // }

// // export default Create

import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ addTodo, setTodoCount, todoCount, scale }) => {
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
        flexDirection: 'row',
        gap: `${0.6 * scale}rem`,
        marginBottom: `${1.2 * scale}rem`,
      }}
    >
      <input
        type="text"
        placeholder="Enter a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{
          padding: `${0.6 * scale}rem`,
          fontSize: `${1 * scale}rem`,
          width: `${15 * scale}rem`,
          borderRadius: `${0.4 * scale}rem`,
          borderBottom: '2px solid #a4c031',
          flex: '1',
        }}
      />
      <button
        type="button"
        onClick={handleAddTodo}
        style={{
          padding: `${0.6 * scale}rem ${1.2 * scale}rem`,
          fontSize: `${1 * scale}rem`,
          borderRadius: `${0.4 * scale}rem`,
          backgroundColor: 'black',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Create;

// import React, { useState } from 'react';
// import axios from 'axios';

// const Create = ({ addTodo, setTodoCount, todoCount }) => {
//   const [task, setTask] = useState('');

//   const handleAddTodo = async () => {
//     try {
//       const user_str = localStorage.getItem('user');
//       if (!user_str) {
//         console.error('User not Logged in');
//         return;
//       }
//       const user = JSON.parse(user_str);

//       const response = await axios.post(
//         'http://localhost:4000/todo/add',
//         {
//           task: task,
//           user: user._id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//           },
//           withCredentials: true,
//         }
//       );

//       addTodo(response.data.result);
//       setTodoCount(todoCount + 1);
//       setTask('');
//     } catch (err) {
//       console.error('Error adding task:', err);
//     }
//   };

//   return (
//     <div
//       className="create_form"
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         gap: '0.6rem',
//         marginBottom: '1.2rem',
//       }}
//     >
//       <input
//         type="text"
//         placeholder="Enter a new task"
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//         style={{
//           padding: '0.6rem',
//           fontSize: '1rem',
//           width: '15rem',
//           borderRadius: '0.4rem',
//           borderBottom: '2px solid #a4c031',
//           flex: '1',
        
//         }}
//       />
//       <button
//         type="button"
//         onClick={handleAddTodo}
//         style={{
//           padding: '0.6rem 1.2rem',
//           fontSize: '1rem',
//           borderRadius: '0.4rem',
//           backgroundColor: 'black',
//           color: '#fff',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         Add
//       </button>
//     </div>
//   );
// };

// export default Create;

