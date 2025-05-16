import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ParentDashboard from './pages/ParentDashboard/ParentDashboard';
import ChildDashboard from './pages/ChildDashboard/ChildDashboard';
import TopUp from './pages/TopUp/TopUp';
import TasksList from './pages/TasksList/TasksList';
import FamiliesList from './pages/FamiliesList/FamiliesList';

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/families" element={<FamiliesList />} />
        
        {/* Protected routes */}
        <Route path="/tasks" element={<TasksList />} />
        <Route
          path="/parent"
          element={token ? <ParentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/child"
          element={token ? <ChildDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/topup"
          element={token ? <TopUp /> : <Navigate to="/login" />}
        />
        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={token ? '/parent' : '/login'} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
