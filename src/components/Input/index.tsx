import { useState } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Task } from "../../App";

import './input.scss';

interface TaskListProps {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
}

export function Input({ tasks, setTasks }: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    const newTask = {
      id: Math.random(),
      title: newTaskTitle, 
      isComplete: false,
    }
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }
  
  return(
    <section className="container">
      <h2>Minhas tasks</h2>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Adicionar novo todo" 
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
        />
        <button 
          type="submit" 
          data-testid="add-task-button" 
          onClick={handleCreateNewTask}
        >
          <FiCheckSquare size={16} color="#fff"/>
        </button>
      </div>
    </section>
  )
}