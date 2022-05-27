import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'

interface InputTaskProps {
  id: string,
  title: string,
  onDone: (id: string) => void,
  onEdited: (id: string, title: string) => void,
  onRemoved: (id: string) => void
}

export const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {
  const [checked, setChecked] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <div className={styles.InputTask}>
      <label className={styles.InputTaskLabel}>
        <input className={styles.InputTaskCheckbox}
               type='checkbox'
               disabled={isEditMode}
               checked={checked}
               onChange={(event) => {
                 setChecked(event.target.checked)
                 if (event.target.checked) {
                   onDone(id)
                 }
               }}
        />
        {isEditMode ?
          (<input />) :
          (<h3 className={styles.InputTaskTitle}>{title}</h3>)
        }

      </label>
      <button aria-label='Edited' className={styles.InputTaskEdited}
              onClick={() => {
                setIsEditMode(true)
              }} />
      <button aria-label='Removed' className={styles.InputTaskRemoved}
              onClick={() => {
                if (confirm('Are you sure ?')) {
                  onRemoved(id)
                }
              }} />
    </div>
  )
}