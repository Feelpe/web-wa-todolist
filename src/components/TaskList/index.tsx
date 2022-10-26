import { useState, FormEvent } from "react";
import axios from "axios";
import * as CheckBox from "@radix-ui/react-checkbox";

import { Trash } from 'phosphor-react'
import { Check } from "phosphor-react";

import './styles.scss';

import { Task } from '../../App';

interface Game {
  id: string;
  title: string;
}

interface TaskListProps {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
}

export function TaskList({ tasks, setTasks }: TaskListProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [check, setCheck] = useState(false);

  // async function handleCreateAd(event: FormEvent) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const data = Object.fromEntries(formData);

  //   if (!data.name) {
  //     return;
  //   }

  //   try {
  //     await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
  //       name: data.name,
  //       yearsPlaying: Number(data.yearsPlaying),
  //       discord: data.discord,
  //       weekDays: weekDays.map(Number),
  //       hourStart: data.hourStart,
  //       hourEnd: data.hourEnd,
  //       useVoiceChannel: useVoiceChannel
  //     })

  //     alert('Anúncio criado com sucesso')
  //   }  catch(err) {
  //     console.log(err);

  //     alert('Erro ao criar o anúncio');
  //   }
  // }

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
                checked={check}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setCheck(true);
                  } else {
                    setCheck(false);
                  }
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