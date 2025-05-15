import AdBanner from '../../components/AdBanner/AdBanner';
import { Link } from 'react-router-dom';
import TasksList from './../TasksList/TasksList';

// ...
export default function ParentDashboard() {
  // ваш код, получение задач и т.д.
  return (
    <div>
      <h1>Кабинет родителя</h1>
      <AdBanner role="parent" />          {/* ← вот он */}
      <Link to="/top-up">Пополнить баланс</Link>
      <TasksList />
      {/* остальная верстка: список задач, формы */}
    </div>
  );
}