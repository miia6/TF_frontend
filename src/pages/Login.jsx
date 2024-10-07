import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import '../styles/login.css'


const Login = () => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailOrPhoneNumberChange = (event) => {
    setEmailOrPhoneNumber(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('Logging in with')

    // TODO: request to backend
    navigate('/dashboard')
  }

  const handleLogout = () => {
    // Clear session logic (e.g., remove tokens)
    navigate('/login')
  }

  return (
    <div className="login-container"> 
      <LoginForm
        handleLogin={handleLogin}
        handleEmailOrPhoneNumberChange={handleEmailOrPhoneNumberChange}
        handlePasswordChange={handlePasswordChange}
        emailOrPhoneNumber={emailOrPhoneNumber}
        password={password}
      />
    </div>
  )
}

export default Login
