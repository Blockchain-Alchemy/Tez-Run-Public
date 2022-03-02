import React from 'react';
import './App.css';
import { ToastListener } from './contexts/ToastsContext'
import Home from "./views/Home"
import Menu from './components/Menu';

const App: React.FC = () => {
  return (
    <>
      <Menu>
        <Home></Home>
        <ToastListener />
      </Menu>
    </>
  )
}

export default App;
