import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import '../styles/login.css'

const users = {
  'testuser': {
      username: 'testuser',
      email: 'testuser@example.com',
      phoneNumber: '1234567890',
      password: '123' 
  }
}

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

    // TO DO: request to backend etc
    const handleLogin = (event) => {
        event.preventDefault()

        const user = Object.values(users).find(user => 
            (user.email === emailOrPhoneNumber || user.phoneNumber === emailOrPhoneNumber) && 
            user.password === password
        )

        if (user) {
            console.log('Logging in with:', { emailOrPhoneNumber, password })
            console.log('Login successful:', user)
            navigate('/courseSelection') 
        } else {
            alert('Invalid email/phone number or password. Please try again.')
        }
    }

    const handleLogout = () => {
        // TO DO: Clear session logic (e.g., remove tokens)
        navigate('/')
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