import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './Signup';
import LoginPage from './LoginPage';
import Home from './Home';

function App() {
  return <>
   <Routes>
   <Route path='/' element={<Home/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signup' element={<SignUp/>} />
   </Routes>

    </> 
}

export default App;
