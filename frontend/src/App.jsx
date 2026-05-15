import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Generate from './pages/Generate'

function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'         element={token ? <Navigate to='/generate' /> : <Navigate to='/login' />} />
        <Route path='/login'    element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile'  element={<Profile />} />
        <Route path='/generate' element={<Generate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App