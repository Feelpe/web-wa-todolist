import { useState, FormEvent } from "react";
import { CheckSquare } from "phosphor-react";

import { useTask } from "../../hooks/useTask";

import './styles.scss';

export function Input() {
  const { createTask } = useTask();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    if (!newTaskTitle) return;

    await createTask({
      task: newTaskTitle,
      isCompleted: false,
    })

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