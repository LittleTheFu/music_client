import React from 'react';
import ReactDOM from 'react-dom/client'; // 引入 createRoot 方法
import App from './App';

// 使用 createRoot 方法创建根节点
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// 使用 root.render 方法渲染应用
root.render(<React.StrictMode><App /></React.StrictMode>);
