import React from 'react'
import PropTypes from 'prop-types'
import '../styles/loginloader.css'

const LoginLoader = ({ message = "Loading...", size = "medium" }) => {
    return (
        <div className="loader-container">
            <div className={`spinner ${size}`}></div>
            <p className="loader-message">{message}</p>
        </div>
    )
}

LoginLoader.propTypes = {
    message: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"])
}

export default LoginLoader
