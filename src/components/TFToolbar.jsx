import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/TF_app_logo.jpg'
import '../styles/dashboard.css'

const TFToolbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Add your logout logic here (e.g., clear session or tokens)
        navigate('/login'); // Redirect back to login page after logging out
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <img src={logo} alt="TF logo" className="dashboard-logo" />
                <div className="dashboard-links">
                    <button onClick={() => navigate('/teammatesFinding')} className="dashboard-link">
                        Teammates Finding
                    </button>
                    <button onClick={() => navigate('/projectProposal')} className="dashboard-link">
                        Project Proposal
                    </button>
                    <button onClick={() => navigate('/projectFinding')} className="dashboard-link">
                        Project Finding
                    </button>
                    <button onClick={() => navigate('/help')} className="dashboard-link help">
                        Help
                    </button>
                    <button onClick={handleLogout} className="dashboard-link logout">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TFToolbar