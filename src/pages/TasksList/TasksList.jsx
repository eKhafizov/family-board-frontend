// src/pages/TasksList/TasksList.jsx
import React from 'react'
import {
  useFetchTasksQuery,
  useUpdateTaskMutation,
  useFetchMeQuery,
  useConfirmTaskMutation
} from '../../store/api'
import CreateTask from '../../components/CreateTask/CreateTask'
import styles from './TasksList.module.css'

export default function TasksList() {
  // 1) Список задач
  const {
    data: tasks = [],
    error: fetchError,
    isLoading: isFetching,
    refetch
  } = useFetchTasksQuery()

  // 2) Мутация для отметки выполнения ребёнком
  const [updateTask, { isLoading: isUpdating, error: updateError }] =
    useUpdateTaskMutation()

  // 3) Мутация для подтверждения родителем
  const [confirmTask, { isLoading: isConfirming, error: confirmError }] =
    useConfirmTaskMutation()

  // 4) Текущий пользователь
  const { data: me } = useFetchMeQuery()

  // 5) Обработчики
  const handleToggle = async (task) => {
    try {
      await updateTask({
        id: task.id,
        is_completed: !task.is_completed,
      }).unwrap()
      // RTK Query автоматически обновит fetchTasks
    } catch (err) {
      console.error('Не удалось обновить задачу', err)
    }
  }

  const handleConfirm = async (task) => {
    try {
      await confirmTask({ id: task.id }).unwrap()
      refetch()
    } catch (err) {
      console.error('Не удалось подтвердить задачу', err)
    }
  }

  // 6) Загрузка / ошибки
  if (isFetching) return <p>Загрузка задач…</p>
  if (fetchError) {
    const msg =
      fetchError.data?.detail ??
      fetchError.error ??
      JSON.stringify(fetchError)
    return <p className={styles.error}>Ошибка загрузки: {msg}</p>
  }

  return (
    <div className={styles.container}>
      <h1>Список задач</h1>

      {/* Форма создания новой задачи */}
      <CreateTask onCreated={refetch} />

      {/* Ошибки мутаций */}
      {updateError && (
        <p className={styles.error}>
          Ошибка отметки выполнения: {updateError.data?.detail ?? updateError.error}
        </p>
      )}
      {confirmError && (
        <p className={styles.error}>
          Ошибка подтверждения: {confirmError.data?.detail ?? confirmError.error}
        </p>
      )}

      {/* Сам список */}
      <ul className={styles.list}>
        {tasks.map(task => (
          <li key={task.id} className={styles.item}>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <p>Цена: {task.price}₽</p>
            <p>
              Статус:{" "}
              {task.done_by_parent
                ? "✅ Подтверждена и переведена"
                : task.done_by_child
                ? "⏳ Ждёт подтверждения"
                : "❌ Не выполнена ребёнком"}
            </p>

            {/* Кнопка отметки выполнения (для ребёнка) */}
            {!task.done_by_child && me?.role === "child" && (
              <button
                onClick={() => handleToggle(task)}
                disabled={isUpdating}
                className={styles.button}
              >
                {isUpdating ? "Помечаем…" : "Отметить выполненной"}
              </button>
            )}

            {/* Кнопка подтверждения и перевода (для родителя) */}
            {me?.role === "parent" && task.done_by_child && !task.done_by_parent && (
              <button
                onClick={() => handleConfirm(task)}
                disabled={isConfirming}
                className={styles.button}
              >
                {isConfirming
                  ? "Перевод…"
                  : `Подтвердить и перевести ${task.price}₽`}
              </button>
            )}

            {/* Пометка о завершении */}
            {task.done_by_parent && (
              <span className={styles.confirmed}>Подтверждена</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}



// // src/pages/TasksList/TasksList.jsx
// import React from 'react'
// import { useFetchTasksQuery, useUpdateTaskMutation, useFetchMeQuery, useConfirmTaskMutation } from '../../store/api'
// import CreateTask from '../../components/CreateTask/CreateTask'
// import styles from './TasksList.module.css'

// export default function TasksList() {

//   const { data: tasks = [], error, isLoading, refetch } = useFetchTasksQuery()
//   const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation()
//   const { data: me } = useFetchMeQuery()      // получаем current user
//   const [confirmTask] = useConfirmTaskMutation()

//   const handleToggle = async (task) => {
//     try {
//       await updateTask({
//         id: task.id,
//         is_completed: !task.is_completed,  // меняем статус на противоположный
//       }).unwrap()
//       // после успешного обновления RTK Query автоматически обновит fetchTasks
//     } catch (err) {
//       console.error('Не удалось обновить задачу', err)
//     }
//   }

//   if (isLoading) return <p>Загрузка задач…</p>
//   if (error) {
//     return (
//       <p>
//         Ошибка загрузки: {
//           // Если fetchBaseQuery вернул JSON с detail
//           error.data?.detail
//           // Либо строковое сообщение
//           ?? (typeof error.data === 'string' && error.data)
//           // Либо внутренняя ошибка
//           ?? error.error
//           // Либо просто приведём весь объект к строке (на крайний случай)
//           ?? JSON.stringify(error)
//         }
//       </p>
//   )}

//   return (
//     <>
//       <CreateTask onCreated={refetch} />
//       {!isLoading && !error && (
//         <ul className={styles.list}>
//           {tasks.map(task => (
//             <li key={task.id} className={styles.item}>
//               <strong>{task.title}</strong>
//               {task.description && <p>{task.description}</p>}
//               <p>
//                 Статус: {task.is_completed ? '✅ Выполнена' : '❌ Не выполнена'}
//               </p>
//               <button
//                 onClick={() => handleToggle(task)}
//                 disabled={isUpdating}
//               >
//                 {task.is_completed ? 'Отметить как не выполнена' : 'Отметить выполненной'}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <ul>
//         {tasks.map(task => (
//           <li key={task.id}>
//             {task.title} — {task.is_completed ? '✅' : '❌'}
//           </li>
//         ))}
//       </ul>
//     </>
    
//   )
// }
