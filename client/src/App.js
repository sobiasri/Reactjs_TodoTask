import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskForm from './TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const response = await axios.post('tasks', task);
    setTasks([...tasks, response.data]);
  };

  const updateTask = async (id, updatedTask) => {
    const response = await axios.put(`/tasks/${id}`, updatedTask);
    setTasks(tasks.map(task => (task._id === id ? response.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div  className="App">
      <h1>Todo List</h1>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <Task key={task._id || index} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default App;
