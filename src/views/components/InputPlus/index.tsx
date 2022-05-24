import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'

interface InputPlusProps {
  onAdd: (title: string) => void
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('')
  const addTask = useCallback(() => {
    onAdd(inputValue)
    setInputValue('')
  }, [inputValue])

  return (
    <div className={styles.InputPlus}>
      <input
        className={styles.InputPlusValue}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addTask()
          }
        }}
        type='text'
        placeholder='Add new task...'
      />

      <button
        className={styles.InputPlusButton}
        onClick={addTask}
        aria-label='Add'
      />
    </div>
  )
}
