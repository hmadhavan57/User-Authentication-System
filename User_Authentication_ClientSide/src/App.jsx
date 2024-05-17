import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import ForgetPassword from './ForgetPassword'
import ResetPassword from './ResetPassword'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/forget-password' element={<ForgetPassword />}></Route>
        <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
