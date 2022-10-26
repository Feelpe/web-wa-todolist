import { useState } from 'react';

import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import { Input } from './components/Input'

import './styles/global.scss'

export interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <Header />
      <main className='container'>
        <Input tasks={tasks} setTasks={setTasks} />
        
        <TaskList tasks={tasks} setTasks={setTasks} />
      </main>
    </>
  )
}
