import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Import icons

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then(() => fetchTodos())
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => fetchTodos())
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create fetchTodos={fetchTodos} /> {/* Pass fetchTodos to Create */}
      <br />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map(todo => (
          <div className='task' key={todo._id}> {/* Use todo._id as key */}
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className='icon' />
              ) : (
                <BsCircleFill className='icon' />
              )}
              <p className={todo.done ? 'line_through' : ''}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
