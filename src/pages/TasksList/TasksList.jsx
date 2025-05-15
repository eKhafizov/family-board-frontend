// src/pages/TasksList/TasksList.jsx
import React from 'react'
import { useFetchTasksQuery } from '../../store/api'
import CreateTask from '../../components/CreateTask/CreateTask'
import styles from './TasksList.module.css'

export default function TasksList() {

  const { data: tasks = [], error, isLoading, refetch } = useFetchTasksQuery()

  if (isLoading) return <p>Загрузка задач…</p>
  if (error)     return <p>Ошибка при загрузке: {error.toString()}</p>

  return (
    <>
      <CreateTask onCreated={refetch} />
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.is_completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </>
    
  )
}
