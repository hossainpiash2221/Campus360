import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Success from './pages/Success';
import AdminPage from './pages/AdminPage';
import FoodRequest from './pages/FoodRequest';
import Login from "./pages/Login";
import Reservation from './components/reservation';
import ReservationList from './components/reservationList';
import './App.css'
// import './pages/admin.js'
import CafeteriaPage from './pages/CafeteriaPage';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/success' element={<Success/>}/>                 
          <Route path='/adminpage' element={<AdminPage/>}/>                 
          <Route path='/cafeteriapage' element={<CafeteriaPage/>}/>                 
          <Route path='/FoodRequest' element={<FoodRequest/>}/>                 
          <Route path='*' element={<NotFound/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<div>Welcome to Dashboard</div>} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservationlist" element={<ReservationList />} />
        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App