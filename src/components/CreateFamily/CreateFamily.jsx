import React, { useState } from 'react'
import { useCreateFamilyMutation } from '../../store/api'
import styles from './CreateFamily.module.css'

export default function CreateFamily({ onCreated }) {
  const [name, setName] = useState('')
  const [createFamily, { isLoading, error }] = useCreateFamilyMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createFamily({ name }).unwrap()
      setName('')
      onCreated?.()  // обновляем список
    } catch (err) {
      console.error('Ошибка создания семьи', err)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Создать семью</h2>
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Название семьи"
        required
      />
      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? 'Создаём…' : 'Создать'}
      </button>
      {error && <p className={styles.error}>Не удалось создать семью</p>}
    </form>
  )
}
