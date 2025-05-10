import AdBanner from '../../components/AdBanner/AdBanner';
// ...
export default function ParentDashboard() {
  // ваш код, получение задач и т.д.
  return (
    <div>
      <h1>Кабинет родителя</h1>
      <AdBanner role="parent" />          {/* ← вот он */}
      {/* остальная верстка: список задач, формы */}
    </div>
  );
}