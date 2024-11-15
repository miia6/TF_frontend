import React from 'react'
import PropTypes from 'prop-types'
import '../styles/loginloader.css'

const LoginLoader = ({ message = "Loading...", size = "medium" }) => {
    return (
        <div className="login-loader-container">
            <div className={`login-spinner ${size}`}></div>
            <p className="login-loader-message">{message}</p>
        </div>
    )
}

LoginLoader.propTypes = {
    message: PropTypes.string
}

export default LoginLoader
