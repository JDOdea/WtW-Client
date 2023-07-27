import React from 'react';
import { Wait } from './components/Wait';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Wait />
    </BrowserRouter>
  </React.StrictMode>
);