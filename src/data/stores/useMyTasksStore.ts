import create from 'zustand'
import { generateId } from '../helpers'

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

export const useStore = create<TasksStore>((set, get) => ({
  tasks: [],

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
}))