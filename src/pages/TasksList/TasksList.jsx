// src/pages/TasksList/TasksList.jsx
import React from 'react'
import { useFetchTasksQuery } from '../../store/api'

export default function TasksList() {

  const { data: tasks, error, isLoading } = useFetchTasksQuery()

  if (isLoading) return <p>Загрузка задач…</p>
  if (error)     return <p>Ошибка при загрузке: {error.toString()}</p>

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.title} — {task.is_completed ? '✅' : '❌'}
        </li>
      ))}
    </ul>
  )
}
