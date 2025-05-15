// src/pages/TasksList/TasksList.jsx
import React from 'react'
import { useFetchTasksQuery, useUpdateTaskMutation } from '../../store/api'
import CreateTask from '../../components/CreateTask/CreateTask'
import styles from './TasksList.module.css'

export default function TasksList() {

  const { data: tasks = [], error, isLoading, refetch } = useFetchTasksQuery()
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation()

  const handleToggle = async (task) => {
    try {
      await updateTask({
        id: task.id,
        is_completed: !task.is_completed,  // меняем статус на противоположный
      }).unwrap()
      // после успешного обновления RTK Query автоматически обновит fetchTasks
    } catch (err) {
      console.error('Не удалось обновить задачу', err)
    }
  }

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
        <ul className={styles.list}>
          {tasks.map(task => (
            <li key={task.id} className={styles.item}>
              <strong>{task.title}</strong>
              {task.description && <p>{task.description}</p>}
              <p>
                Статус: {task.is_completed ? '✅ Выполнена' : '❌ Не выполнена'}
              </p>
              <button
                onClick={() => handleToggle(task)}
                disabled={isUpdating}
              >
                {task.is_completed ? 'Отметить как не выполнена' : 'Отметить выполненной'}
              </button>
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
