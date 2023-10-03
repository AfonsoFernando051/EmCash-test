import React from 'react';
import HomeLogin from './pages/HomeLogin';
import SecondHalfPage from './components/loginPage/SecondHalfPage';
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLogin />}/>
        <Route path="/dashboard" element={<SecondHalfPage />}/>

      </Routes>
      <HomeLogin/>
    </BrowserRouter>
  );
}

export default App;
