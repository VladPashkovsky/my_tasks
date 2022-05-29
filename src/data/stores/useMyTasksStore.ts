import create, { State, StateCreator } from 'zustand'
import { generateId } from '../helpers'
import { devtools } from 'zustand/middleware'

interface Task {
  id: string,
  title: string,
  createdAt: number
}

interface TasksStore {
  tasks: Task[],
  createTask: (title: string) => void
  updateTask: (id: string, title: string) => void
  removeTask: (id: string) => void
}

function isTasksStore(object: any): object is TasksStore {
  return 'tasks' in object
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):
  StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
  if (isTasksStore(nextState)) {
    window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks))
  }
  set(nextState, ...args)
}, get, api)

const getCurrentState = () => {
  try {
    const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[]
    return currentState
  } catch (e) {
    window.localStorage.getItem('tasks' || '[]')
  }
  return []
}

export const useStore = create<TasksStore>(localStorageUpdate(devtools((set, get) => ({
  tasks: getCurrentState(),

  createTask: (title) => {
    const { tasks } = get()
    const newTask = { id: generateId(), title, createdAt: Date.now() }
    set({ tasks: [newTask].concat(tasks) })
  },

  updateTask: (id: string, title: string) => {
    const { tasks } = get()
    set({ tasks: tasks.map(t => ({ ...t, title: t.id === id ? title : t.title })) })
  },

  removeTask: (id: string) => {
    const { tasks } = get()
    set({ tasks: tasks.filter(t => (t.id !== id)) })
  },
}))))