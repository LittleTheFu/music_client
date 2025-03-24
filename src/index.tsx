import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 修改前
// ReactDOM.render(<App />, document.getElementById('root'));

// 修改后
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);