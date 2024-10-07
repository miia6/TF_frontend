import React, { useState } from 'react'
import SignUpForm from '../components/SignUpForm'
import '../styles/signup.css'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    console.log('Signing up with:', { username, email, phoneNumber, password })
    
    // TODO: request to backend
  }

  return (
    <div className="signup-container">
      <SignUpForm
        handleSignUp={handleSignUp}
        handleUsernameChange={handleUsernameChange}
        handleEmailChange={handleEmailChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        email={email}
        phoneNumber={phoneNumber}
        password={password}
      />
    </div>
  )
}

export default SignUp
