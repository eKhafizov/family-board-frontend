import { useState } from 'react';
import { useFetchLoginMutation } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate                = useNavigate();

  const [login] = useFetchLoginMutation();


  const handle = async (e) => {
    e.preventDefault();
    login({ username: email, password: password})
    await login({ username: email, password }).unwrap()
    // после того, как данные пользователя попадут в кэш fetchMe,
    // вы можете подписаться на useFetchMeQuery в любом месте (например, в App.jsx)
    navigate('/parent')  // или маршрут по роли, как раньше
  };

  return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handle}>
          <h1 className={styles.title}>Вход</h1>
          <h2>TEST</h2>

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

          <button
            className={styles.button}
            type="submit"
            // disabled={isLogging || isFetchingMe}
          >
            {/* {isLogging || isFetchingMe ? 'Загрузка…' : 'Войти'} */}
          </button>

          {/* {loginError && <p className={styles.error}>Ошибка: {loginError.data?.detail || loginError.error}</p>} */}
        </form>
      </div>
  );
}


// import { useState } from 'react';
// import { useLoginMutation, useGetMeQuery } from '../../store/api';
// import { useNavigate } from 'react-router-dom';
// import styles from './Login.module.css';

// export default function Login() {
//   const [email, setEmail]       = useState('');
//   const [password, setPassword] = useState('');
//   const navigate                = useNavigate();

//   // 1) RTK Query хук для логина
//   const [login, { isLoading: isLogging, error: loginError }] = useLoginMutation();

//   // 2) RTK Query хук для /users/me — но сразу не делать запрос
//   const {
//     data: me,
//     refetch: fetchMe,    // эта функция запустит запрос
//     isFetching: isFetchingMe,
//   } = useGetMeQuery(undefined, { skip: true });

//   // 3) Обработчик формы
//   const handle = async (e) => {
//     e.preventDefault();
//     try {
//       // 3.1) Логинимся
//       const { access_token } = await login({ email, password }).unwrap();
//       localStorage.setItem('token', access_token);

//       // 3.2) Теперь можем получить /users/me
//       const meResult = await fetchMe().unwrap(); // вернёт объект { id, email, role, ... }
//       localStorage.setItem('familyId', String(meResult.family_id));
//       localStorage.setItem('role', meResult.role);

//       // 3.3) И только после этого навигируем
//       navigate(meResult.role === 'parent' ? '/parent' : '/child');

//     } catch (err) {
//       // здесь можно распарсить err.data.detail или просто alert
//       alert('Не удалось войти: ' + (err.data?.detail || err.message));
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {/* <h1>TEST</h1> */}
//       <form className={styles.form} onSubmit={handle}>
//         <h1 className={styles.title}>Вход</h1>
//         <h2>TEST</h2>

//         <input
//           className={styles.input}
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />

//         <input
//           className={styles.input}
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Пароль"
//           required
//         />

//         <button className={styles.button} type="submit" disabled={isLogging || isFetchingMe}>
//           {isLogging || isFetchingMe ? 'Загрузка…' : 'Войти'}
//         </button>

//         {loginError && <p className={styles.error}>Ошибка: {loginError.data?.detail || loginError.error}</p>}
//       </form>
//     </div>
//   );
// }
