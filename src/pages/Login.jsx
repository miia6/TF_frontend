import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
//import { login } from '../services/auth'
import '../styles/login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const navigate = useNavigate()

    // TO DO: request to backend etc
    //const handleLogin = async (event) => {
    const handleLogin = (event) => {
        event.preventDefault()
        console.log('Loggin in with:', { email, password })

        if (!email || !password) {
            alert('Please fill username and password.')
            return
        }

        const storedUser = JSON.parse(localStorage.getItem('user'))

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            console.log('Login successful')
            navigate('/courseSelection')
        } else {
            alert('Invalid email or password. Please try again.')
        }

        /*try {
            //const response = await login(email, password)
            //console.log('Login successful', response)
        } catch (error) {
            console.error(error)
            alert('Invalid email or password. Please try again.')

        }*/
    }

    return (
        <div className="login-container">
            <LoginForm
                handleLogin={handleLogin}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                email={email}
                password={password}
            />
        </div>
    )
}

export default Login
