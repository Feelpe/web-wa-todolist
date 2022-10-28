import { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState 
} from 'react';
import { api } from '../services/api';

interface TaskProviderProps {
  children: ReactNode;
}

interface Task {
  id: number;
  task: string;
  isCompleted: boolean;
}

type TaskInput = Pick<Task, 'task' | 'isCompleted'>;

interface TaskContextData {
  tasks: Task[];
  createTask: (task: TaskInput) => Promise<void>;
  updateTask: (taskUpdate: Task) => void;
  removeTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get('/Task').then(response => setTasks(response.data))
  })

  async function createTask(taskInput: TaskInput) {
    const response = await api.post('/Task', {
      ...taskInput,
    })
    
    const { tasks } = response.data; 

    setTasks([
      ...tasks,
      tasks,
    ]);
  }

  async function updateTask(taskUpdate: Task) {
    const response = await api.put(`/Task/${taskUpdate.id}`, {
      task: taskUpdate.task,
      isCompleted: taskUpdate.isCompleted
    })
    
    const { tasks } = response.data; 

    setTasks([
      ...tasks,
      tasks,
    ]);
  }

  async function removeTask(id: number) {
    const response = await api.delete(`/Task/${id}`)
    
    const { tasks } = response.data; 

    setTasks([
      ...tasks,
      tasks,
    ]);
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);

  return context;
}
