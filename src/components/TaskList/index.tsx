import { useState } from "react";
import * as CheckBox from "@radix-ui/react-checkbox";

import { Trash } from 'phosphor-react'
import { Check } from "phosphor-react";

import { api } from "../../services/api";

import './styles.scss';

export interface Task {
  id: number;
  task: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

export interface HandleTask {
  task: Task;
  checked: boolean;
}

export function TaskList({ tasks }: TaskListProps) {
  const [isCompleted, setIsCompleted] = useState(Boolean);

  function handleToggleTaskCompletion({ task, checked }: HandleTask) {
    api.put(`/Task/${task.id}`, {
      task: task.task,
      isCompleted: checked
    });
  }

  function handleRemoveTask(id: number) {
    api.delete(`/Task/${id}`);
  }

  return (
    <div className='task-list'>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              <CheckBox.Root 
                checked={isCompleted}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setIsCompleted(true);
                    handleToggleTaskCompletion({task, checked});
                  } else {
                    setIsCompleted(false);
                    handleToggleTaskCompletion({task, checked:false});
                  }
                }}
                className='checkbox'
              >
                <CheckBox.Indicator>
                  <Check size={24} color='var(--blue)' weight="bold" />
                </CheckBox.Indicator>
              </CheckBox.Root>
              <p>{task.task}</p>
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