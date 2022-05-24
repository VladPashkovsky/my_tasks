import React from 'react'
import styles from './index.module.scss'
import { useStore } from '../../data/stores/useMyTasksStore'

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask] = useStore(state =>
    [state.tasks, state.createTask, state.updateTask, state.removeTask])
  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>My Tasks:</h1>
      <section className={styles.articleSection}></section>
      <section className={styles.articleSection}></section>
    </article>
  )
}