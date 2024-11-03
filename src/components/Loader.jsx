import React from 'react'
import PropTypes from 'prop-types'
import '../styles/loader.css'

const Loader = ({ message = "Loading...", size = "medium" }) => {
    return (
        <div className="loader-container">
            <div className={`spinner ${size}`}></div>
            <p className="loader-message">{message}</p>
        </div>
    )
}

Loader.propTypes = {
    message: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"])
}

export default Loader
