import { FiTrash } from 'react-icons/fi'
import { Task } from '../../App';

import './tasklist.scss'

interface TaskListProps {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
}

export function TaskList({ tasks, setTasks }: TaskListProps) {
  function handleToggleTaskCompletion(id: number) {
    const newState = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);
    setTasks(newState);
  }

  function handleRemoveTask(id: number) {
    const filteredTask = tasks.filter(task => task.id !== id);
    setTasks(filteredTask);
  }

  return (
    <div className='task-list'>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div 
              className={task.isComplete ? 'completed' : ''} 
              data-testid="task" 
            >
              <label className="checkbox-container">
                <input 
                  type="checkbox"
                  readOnly
                  checked={task.isComplete}
                  onClick={() => handleToggleTaskCompletion(task.id)}
                />
                <span className="checkmark"></span>
              </label>
              <p>{task.title}</p>
            </div>
            <button 
              type="button" 
              data-testid="remove-task-button" 
              onClick={() => handleRemoveTask(task.id)}
            >
              <FiTrash size={16}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}