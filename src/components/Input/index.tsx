import { useState, FormEvent } from "react";
import { CheckSquare } from "phosphor-react";

import { api } from "../../services/api";

import './styles.scss';

export function Input() {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    
    const newTask = {
      task: newTaskTitle, 
      isComplete: false,
    }

    api.post('/Task', newTask)
    
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