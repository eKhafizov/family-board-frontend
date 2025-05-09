import React from 'react';
import { createRoot } from 'react-dom/client';        // <-- импортируем createRoot
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';                                 // если у вас есть глобальные стили

// Берём контейнер из index.html
const container = document.getElementById('root');

// Создаём корневой объект
const root = createRoot(container);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
