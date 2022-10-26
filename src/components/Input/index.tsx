import { useState } from "react";
import { CheckSquare } from "phosphor-react";

import { Task } from "../../App";

import './styles.scss';

interface InputProps {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
}

export function Input({ tasks, setTasks }: InputProps) {
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
          <CheckSquare size={24} color="var(--shapes)" weight='bold' />
        </button>
      </div>
    </section>
  )
}