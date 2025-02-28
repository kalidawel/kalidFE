import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom"
import Navbar from "./static/Navbar"
import './App.css'
import LandingPage from './static/LandingPage'
import EmployeeIndex from './components/employees/EmployeeIndex'
import CompanyIndex from './components/companys/CompanyIndex'
import Register from './components/auth/Register'
import Login from "./components/auth/Login"
import CreateEmployee from './components/employees/CreateEmployee'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CreateCompany from './components/companys/CreateCompany'
import UpdateEmployee from './components/employees/UpdateEmployee'

function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/employee-index" element={<EmployeeIndex/>} />
        <Route path="/company-index" element={<CompanyIndex/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/create-employee" element={
          <ProtectedRoute>
            <CreateEmployee/>
          </ProtectedRoute>
          }/>
        <Route path="/create-company" element={
          <ProtectedRoute>
            <CreateCompany/>
          </ProtectedRoute>
          } />
        <Route path="/update-employee/:id" element={
          <ProtectedRoute>
            <UpdateEmployee/>
          </ProtectedRoute>
          }/>
      </Routes>
    </>
  )
}

export default App
