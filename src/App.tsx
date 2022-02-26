import React, { useState } from 'react';
import './App.css';
import Home from "./views/Home"
import Menu from './components/Menu';


function App() {
  return (
    <>
      <Menu>
        <Home></Home>
      </Menu>
    </>
  )
}

export default App;
