import AdBanner from '../../components/AdBanner/AdBanner';
// ...
export default function ChildDashboard() {
  return (
    <div>
      <h1>Кабинет ребёнка</h1>
      <AdBanner role="child" />
      {/* список заданий, баланс и т.д. */}
    </div>
  );
}