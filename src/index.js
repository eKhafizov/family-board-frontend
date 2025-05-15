import React from 'react';
import { createRoot } from 'react-dom/client';        // <-- импортируем createRoot
import { Provider } from 'react-redux';
import App from './App';
import './index.css'; 
import { store } from './store/index'         // ← импорт store
import { api }   from './store/apiSlice'// ← импорт apiSlice

// Берём контейнер из index.html
const container = document.getElementById('root');

// Создаём корневой объект
const root = createRoot(container);

// Делаете их доступными в консоли
window.store = store
window.api   = api

// Рендерим приложение
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
