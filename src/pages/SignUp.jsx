import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'

import { signup } from '../services/auth'
import { removeSelectedCourseCookies } from '../services/course'
import LoginLoader from '../components/LoginLoader'
import '../styles/signup.css'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
        setErrors((prev) => ({ ...prev, username: '' }))
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        setErrors((prev) => ({ ...prev, email: '' }))
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        setErrors((prev) => ({ ...prev, password: '' }))
    }

    const handleSignUp = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        console.log('Signing up with:', { username, email })

        let validationErrors = {}

        if (!username) {
            validationErrors.username = "Username is required"
        }
        if (!email) {
            validationErrors.email = "Email is required"
        }
        if (!password) {
            validationErrors.password = "Password is required"
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            const response = await signup(email, password, username, '1234567890')
            removeSelectedCourseCookies()
            setIsLoading(false)
            navigate('/courseSelection')
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <div className="signup-container">
            {errors.general && <p className="error-text">{errors.general}</p>}
            {isLoading && <LoginLoader message="Signing up..." />}
            <SignUpForm
                handleSignUp={handleSignUp}
                handleUsernameChange={handleUsernameChange}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                username={username}
                email={email}
                password={password}
                errors={errors}
            />
        </div>
    )
}

export default SignUp
