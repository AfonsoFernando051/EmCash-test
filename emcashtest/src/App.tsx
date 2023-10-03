import React from 'react';
import HomeLogin from './pages/HomeLogin';
import SecondHalfPage from './components/loginPage/SecondHalfPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLogin />}/>
        <Route path="/dashboard" element={<SecondHalfPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
