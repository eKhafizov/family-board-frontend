import React, { useState } from 'react'
import { useCreateTaskMutation } from '../../store/api'
import styles from './CreateTask.module.css'

export default function CreateTask({ onCreated }) {
  const [title, setTitle]             = useState('')
  const [description, setDescription] = useState('')
  const [createTask, { isLoading, error }] = useCreateTaskMutation()
  const [price, setPrice]             = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTask({
        title,
        description,
        price,
        done_by_parent: false,
        family_id: null,
        assigned_to_child_id: null,
      }).unwrap()
      // сброс формы
      setTitle('')
      setDescription('')
      setPrice(0)
      // уведомляем родителя (или перелистываем и т.п.)
      onCreated?.()
    } catch (err) {
      console.error('Ошибка создания задачи', err)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Новая задача</h2>
      <input
        className={styles.input}
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Заголовок"
        required
      />
      <textarea
        className={styles.textarea}
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Описание (необязательно)"
      />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        placeholder="Цена"
        required
      />
      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? 'Создаём…' : 'Создать'}
      </button>
      {error && <p className={styles.error}>Не удалось создать задачу</p>}
    </form>
  )
}
