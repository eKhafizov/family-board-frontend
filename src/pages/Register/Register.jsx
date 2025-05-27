// src/pages/Register/Register.jsx
//test

import React, { useState } from 'react';
import { useRegisterMutation } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'parent',
    family_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setForm((prev) => ({
      ...prev,
      role,
      family_id: role === 'child' ? prev.family_id : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: form.email,
        password: form.password,
        full_name: form.fullName,
      };
      await register(payload).unwrap();
      alert('Успешная регистрация! Теперь войдите.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Ошибка регистрации: ' + (err.data?.detail || err.error || err.message));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Регистрация</h1>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Пароль
          <input
            className={styles.input}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Роль
          <select
            className={styles.select}
            name="role"
            value={form.role}
            onChange={handleRoleChange}
          >
            <option value="parent">Родитель</option>
            <option value="child">Ребёнок</option>
          </select>
        </label>

        {form.role === 'child' && (
          <label className={styles.label}>
            ID семьи
            <input
              className={styles.input}
              type="number"
              name="family_id"
              value={form.family_id}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Регистрация…' : 'Зарегистрироваться'}
        </Button>
      </form>
    </div>
  );
}
