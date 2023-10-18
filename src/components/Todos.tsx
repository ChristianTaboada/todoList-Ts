import React, { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { type ListOfTodos, type TodoId, type Todo as TodoType } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: (params: Omit<TodoType, 'completed'>) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo, setTitle }) => {
  const [isEditing, setIsEditing] = useState('')
  const [parent] = useAutoAnimate()

  return (
    <ul className='todo-list' ref={parent}>
  {todos.map(todo => (
    <li
    key={todo.id}
    onDoubleClick={() => { console.log('doble click en', todo.id); setIsEditing(todo.id) }}
    className={`
    ${todo.completed ? 'completed' : ''}
    ${isEditing === todo.id ? 'editing' : ''}
    `}
    >
        <Todo
        key={todo.id}
        id={todo.id}
        title={todo.title}
        completed={todo.completed}
        onRemoveTodo={onRemoveTodo}
        onToggleCompleteTodo={onToggleCompleteTodo}
        setTitle={setTitle}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        />
    </li>
  ))}
    </ul>
  )
}
