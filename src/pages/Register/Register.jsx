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
    family_id: ''  // остаётся пустой строкой, когда роль parent — не отправляется
  });

  // Универсальный обработчик изменений
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Особенная логика для роли — сброс family_id, если родитель
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setForm(prev => ({
      ...prev,
      role,
      family_id: role === 'child' ? prev.family_id : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Формируем payload для бэка: family_id либо число, либо null
      const payload = {
        email: form.email,
        password: form.password,
        role: form.role,
        family_id: form.role === 'child' ? Number(form.family_id) : null
      };
      await register(payload).unwrap();
      alert('Успешная регистрация! Теперь войдите в систему.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error', err);
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
