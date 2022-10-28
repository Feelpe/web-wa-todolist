import { useEffect, useState } from 'react';

import { api } from './services/api';

import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import { Input } from './components/Input'

import './styles/global.scss'

export interface Task {
  id: number;
  task: string;
  isComplete: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTask = async () => {
    await api.get('/Task').then((response) => {
      setTasks(response.data);
    });
  }

  useEffect(() => {
    getTask();
  }, [])

  return (
    <>
      <Header />
      <main className='container'>
        <Input />
        
        <TaskList tasks={tasks} />
      </main>
    </>
  )
}
