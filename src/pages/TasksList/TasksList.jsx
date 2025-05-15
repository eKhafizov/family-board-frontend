// src/pages/TasksList/TasksList.jsx
import React from 'react'
import { useFetchTasksQuery } from '../../store/api'
import CreateTask from '../../components/CreateTask/CreateTask'

export default function TasksList() {

  const { data: tasks = [], error, isLoading, refetch } = useFetchTasksQuery()

  if (isLoading) return <p>Загрузка задач…</p>
  if (error) {
    return (
      <p>
        Ошибка загрузки: {
          // Если fetchBaseQuery вернул JSON с detail
          error.data?.detail
          // Либо строковое сообщение
          ?? (typeof error.data === 'string' && error.data)
          // Либо внутренняя ошибка
          ?? error.error
          // Либо просто приведём весь объект к строке (на крайний случай)
          ?? JSON.stringify(error)
        }
      </p>
  )}

  return (
    <>
      <CreateTask onCreated={refetch} />
      {!isLoading && !error && (
        <ul >
          {tasks.map(task => (
            <li key={task.id} >
              <strong>{task.title}</strong>
              {task.description && <p>{task.description}</p>}
              <p>
                Статус: {task.is_completed ? '✅ Выполнена' : '❌ Не выполнена'}
              </p>
            </li>
          ))}
        </ul>
      )}
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
