import AdBanner from '../../components/AdBanner/AdBanner';
import { Link } from 'react-router-dom';

// ...
export default function ParentDashboard() {
  // ваш код, получение задач и т.д.
  return (
    <div>
      <h1>Кабинет родителя</h1>
      <AdBanner role="parent" />          {/* ← вот он */}
      <Link to="/top-up">Пополнить баланс</Link>
      {/* остальная верстка: список задач, формы */}
    </div>
  );
}