import React from 'react'
import { useFetchFamiliesQuery } from '../../store/api'
import CreateFamily from '../../components/CreateFamily/CreateFamily'
import styles from './FamiliesList.module.css'

export default function FamiliesList() {
  const {
    data: families = [],
    error,
    isLoading,
    refetch
  } = useFetchFamiliesQuery()

  let errorMessage = ''
  if (error) {
    errorMessage =
      error.data?.detail
      ?? error.error
      ?? JSON.stringify(error)
  }

  return (
    <div className={styles.container}>
      <h1>Семьи</h1>

      <CreateFamily onCreated={refetch} />

      {isLoading && <p>Загрузка…</p>}
      {error && <p className={styles.error}>Ошибка: {errorMessage}</p>}

      {!isLoading && !error && (
        <ul className={styles.list}>
          {families.map(fam => (
            <li key={fam.id} className={styles.item}>
              {fam.name} (создана {new Date(fam.created_at).toLocaleDateString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
