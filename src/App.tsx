import { TaskProvider } from './hooks/useTask';

import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import { Input } from './components/Input'

import './styles/global.scss'

export function App() {
  return (
    <TaskProvider>
      <Header />
      <main className='container'>
        <Input />
        <TaskList />
      </main>
    </TaskProvider>
  )
}
