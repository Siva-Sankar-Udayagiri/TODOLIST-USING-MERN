import React, { useState } from 'react';
import axios from 'axios';

function Create({ fetchTodos }) { 
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() !== '') {
      axios
        .post('http://localhost:3001/add', { task: task })
        .then(() => {
          fetchTodos(); 
          setTask(''); 
        })
        .catch(err => console.log(err));
    } else {
      console.log('Task cannot be empty');
    }
  };

  return (
    <div className='create_form'>
      <input
        type='text'
        placeholder='Enter Task'
        onChange={e => setTask(e.target.value)}
        value={task}
      />
      <button type='button' onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;

