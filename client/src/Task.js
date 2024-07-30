import React, { useState } from 'react';
import './App.css';

const Task = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newStatus, setNewStatus] = useState(task.status);

  const handleUpdate = () => {
    updateTask(task._id, { title: newTitle, description: newDescription, status: newStatus });
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
           className="input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
           className="input"
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <select  className="picker" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button className="editsButton" onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span>{task.title}</span> - 
          <span>{task.description}</span> - 
          <span>{task.status}</span>
          <button className="editButton" onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button  className="deleteButton" onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
};

export default Task;
