import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import { signup } from '../services/auth'
import '../styles/signup.css'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

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
        console.log('Signing up with:', { username, email, password })

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
            const response = await signup(email, password, username)
            console.log('Signup response:', response)
            navigate('/CourseSelection')
        } catch (error) {
            console.error(error)
        }

        // TODO: request to backend
    }

    return (
        <div className="signup-container">
            {/*{errors.general && <p className="error-text">{errors.general}</p>}*/}
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
