import React from 'react';
import HomeLogin from './pages/HomeLogin';
import Dashboard from './pages/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLogin />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
