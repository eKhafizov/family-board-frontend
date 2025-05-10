import React, { useState } from 'react';
import { useRegisterMutation } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Register.module.css';

export default function Register() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [role, setRole]           = useState('parent');
  const [familyId, setFamilyId]   = useState('');
  const navigate                  = useNavigate();

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        email,
        password,
        role,
        family_id: role === 'child' ? Number(familyId) : null,
      }).unwrap();
      alert('Успешная регистрация! Теперь войдите.');
      navigate('/login');
    } catch (err) {
      alert('Ошибка регистрации: ' + (err.data?.detail || err.error));
    }
  };

  return (
    <div className={styles.container}>
      <h1>test</h1>
      {/* <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Регистрация</h1>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Пароль
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Роль
          <select
            className={styles.select}
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="parent">Родитель</option>
            <option value="child">Ребёнок</option>
          </select>
        </label>

        {role === 'child' && (
          <label className={styles.label}>
            ID семьи
            <input
              className={styles.input}
              type="number"
              value={familyId}
              onChange={e => setFamilyId(e.target.value)}
              required
            />
          </label>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Регистрация…' : 'Зарегистрироваться'}
        </Button>

        {error && (
          <p className={styles.error}>
            Ошибка: {error.data?.detail || error.error}
          </p>
        )}
      </form> */}
    </div>
  );
}
