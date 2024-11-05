import React from 'react'
import PropTypes from 'prop-types'
import '../styles/pageloader.css'

const PageLoader = ({ message = "Loading...", size = "medium" }) => {
    return (
        <div className="page-loader-container">
            <div className={`spinner ${size}`}></div>
            <p className="page-loader-message">{message}</p>
        </div>
    )
}

PageLoader.propTypes = {
    message: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"])
}

export default PageLoader
