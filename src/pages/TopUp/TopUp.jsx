import React, { useState } from 'react'
//import { useTopUpMutation } from '../../store/api'
import { useNavigate } from 'react-router-dom'
import styles from './TopUp.module.css'
import Button from '../../components/Button/Button'

export default function TopUp() {
  const [amount, setAmount] = useState('')
//  const [topUp, { isLoading, error }] = useTopUpMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // familyId можно взять из currentUser или передать пропсом
      //const familyId = localStorage.getItem('familyId')  
      //await topUp({ familyId, amount: Number(amount) }).unwrap()
      alert('Баланс успешно пополнен!')
      navigate('/parents/dashboard')
    } catch (err) {
      alert('Ошибка пополнения: ' + (err.data?.detail || err.error))
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Пополнить баланс</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Сумма (₽)
          <input
            className={styles.input}
            type="number"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>
        <Button
          type="submit"
          //disabled={isLoading}
        >
          'Пополнить'
          {/* {isLoading ? 'Отправка…' : 'Пополнить'} */}
        </Button>
        {/* {error && (
          <p className={styles.error}>
            {error.data?.detail || error.error}
          </p>
        )} */}
      </form>
    </div>
  )
}
