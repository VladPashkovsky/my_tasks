import React, { useEffect, useRef, useState } from 'react'
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
  const [value, setValue] = useState(title)
  const editTitleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus()
    }
  }, [isEditMode])

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
                   setTimeout(() => {
                     onDone(id)
                   }, 1000)
                 }
               }}
        />

        {isEditMode
          ? (<input className={styles.InputTaskEditTitle}
                    value={value}
                    ref={editTitleInputRef}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        onEdited(id, value)
                        setIsEditMode(false)
                      }
                    }
                    } />)
          : (<h3 className={styles.InputTaskTitle}>{title}</h3>)
        }

      </label>
      {isEditMode
        ? (<button aria-label='Save' className={styles.InputTaskSave}
                   onClick={() => {
                     onEdited(id, value)
                     setIsEditMode(false)
                   }} />)
        : (<button aria-label='Edited' className={styles.InputTaskEdited}
                   onClick={() => {
                     setIsEditMode(true)
                   }} />)
      }

      <button aria-label='Removed' className={styles.InputTaskRemoved}
              onClick={() => {
                if (confirm('Are you sure ?')) {
                  onRemoved(id)
                }
              }} />
    </div>
  )
}