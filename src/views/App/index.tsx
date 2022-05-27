import React from 'react'
import styles from './index.module.scss'
import { useStore } from '../../data/stores/useMyTasksStore'
import { InputPlus } from '../components/InputPlus'
import { InputTask } from '../components/InputTask'

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask] = useStore(state =>
    [
      state.tasks,
      state.createTask,
      state.updateTask,
      state.removeTask,
    ])

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>My Tasks:</h1>
      <section className={styles.articleSection}>
        <InputPlus onAdd={createTask} />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is no one task...</p>)}
        {tasks.map(t =>
          <InputTask key={t.id} id={t.id} title={t.title}
                     onDone={removeTask}
                     onEdited={updateTask}
                     onRemoved={removeTask} />)}
      </section>
    </article>
  )
}