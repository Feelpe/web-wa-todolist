import * as CheckBox from "@radix-ui/react-checkbox";

import { Trash } from 'phosphor-react'
import { Check } from "phosphor-react";

import './styles.scss';

export interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

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
            <div>
              <CheckBox.Root 
                checked={task.isComplete}
                onCheckedChange={() => {
                  handleToggleTaskCompletion(task.id)
                }}
                className='checkbox'
              >
                <CheckBox.Indicator>
                  <Check size={24} color='var(--blue)' weight="bold" />
                </CheckBox.Indicator>
              </CheckBox.Root>
              <p>{task.title}</p>
            </div>
            <button 
              type="button" 
              data-testid="remove-task-button" 
              onClick={() => handleRemoveTask(task.id)}
            >
              <Trash size={24} color='var(--red)' weight="bold" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}