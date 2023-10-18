import React, { useState, useRef, useEffect } from 'react'
import { type Todo as TodoType, type TodoId } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: (params: Omit<TodoType, 'completed'>) => void
  isEditing: string
  setIsEditing: (completed: string) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo, setTitle, isEditing, setIsEditing }) => {
  console.log('valor de isEditing', isEditing)
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo({
      id,
      completed: event.target.checked
    })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') onRemoveTodo({ id })

      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])
  return (

        <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={completed}
              onChange={handleChangeCheckbox}
            />
            <label>{title}</label>
            <button
             className='destroy'
             onClick={() => {
               onRemoveTodo({ id })
             }}
            />

            <input
            className='edit'
            value={editedTitle}
            onChange={(e) => { setEditedTitle(e.target.value) }}
            onKeyDown={handleKeyDown}
            onBlur={() => { setIsEditing('') }}
            ref={inputEditTitle}
            />
        </div>
  )
}
