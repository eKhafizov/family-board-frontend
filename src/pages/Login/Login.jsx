import { useState } from 'react';
import { useLoginMutation, useGetMeQuery } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      localStorage.setItem('token', result.access_token);
      const me = await useGetMeQuery().refetch();
      navigate(me.data.role === 'parent' ? '/parent' : '/child');
    } catch {
      alert('Ошибка входа');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handle}>
        <h1 className={styles.title}>Вход</h1>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
