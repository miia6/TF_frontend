import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import '../styles/login.css'
import { login } from '../services/auth'

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
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('Logging in with')

        try {
            const response = await login(emailOrPhoneNumber, password)

            console.log('Login successful', response)
            navigate('/courseSelection')
        } catch (error) {
            console.error(error)
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
