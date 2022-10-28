import { useState } from "react";

import { useTask } from "../../hooks/useTask";
import { api } from "../../services/api";

import * as CheckBox from "@radix-ui/react-checkbox";
import { Trash } from 'phosphor-react'
import { Check } from "phosphor-react";

import './styles.scss';

export interface Task {
  id: number;
  task: string;
  isCompleted: boolean;
}

export interface HandleTask {
  task: Task;
  checked: boolean;
}

export function TaskList() {
  const { tasks, updateTask, removeTask } = useTask();

  async function handleToggleTaskStatus({ task, checked }: HandleTask) {
    await updateTask({
      id: task.id,
      task: task.task,
      isCompleted: checked,
    })
  }

  async function handleRemoveTask(id: number) {
    await removeTask(id)
    // api.delete(`/Task/${id}`);
  }

  const reversedTasks = [...tasks].reverse();

  return (
    <div className='task-list'>
      <ul>
        {reversedTasks.map(task => (
          <li key={task.id}>
            <div>
              <CheckBox.Root 
                checked={task.isCompleted}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    handleToggleTaskStatus({task, checked});
                  } else {
                    handleToggleTaskStatus({task, checked:false});
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