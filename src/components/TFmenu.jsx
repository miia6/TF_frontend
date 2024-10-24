import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/TF_app_logo.jpg'
import '../styles/tfmenu.css'

const TFmenu = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Add your logout logic here (e.g., clear session or tokens)
        navigate('/login')
    }

    return (
        <div className="dashboard-menu">
              <img src={logo} alt="TF logo" className="dashboard-logo" />
                <div className="dashboard-links">
                    <div className="left-links">
                        <button onClick={() => navigate('/dashboard')} className="dashboard-link">
                            Frontpage
                        </button>
                        <button onClick={() => navigate('/projectFinding')} className="dashboard-link">
                            Project Finding
                        </button>
                        <button onClick={() => navigate('/teammatesFinding')} className="dashboard-link">
                            Teammates Finding
                        </button>
                        <button onClick={() => navigate('/projectProposal')} className="dashboard-link">
                            Project Proposal
                        </button>
                        <button onClick={() => navigate('/yourProject')} className="dashboard-link">
                            Your Project
                        </button>
                    </div>
                    <button onClick={handleLogout} className="dashboard-link logout">
                        Logout
                    </button>
                </div>
          </div>
    )
}

export default TFmenu