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
  isComplete: boolean;
}

// type TaskInput = Omit<Task, 'id'>;

interface TaskContextData {
  tasks: Task[];
  // createTask: (task: TaskInput) => Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get('/Task').then(response => setTasks(response.data.tasks))
    console.log(tasks)
  })

  return (
    <TaskContext.Provider value={{ tasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);

  return context;
}
