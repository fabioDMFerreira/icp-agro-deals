import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DealPage from './pages/DealPage';
import './index.scss';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/deal/:dealId', element: <DealPage />},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
