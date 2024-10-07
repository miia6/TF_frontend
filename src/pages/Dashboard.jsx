import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'

const Dashboard = ({ appLogo }) => {
  const [selectedCourse, setSelectedCourse] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const course = localStorage.getItem('selectedCourse')
    if (course) {
      setSelectedCourse(course)
    }
  }, [])

  const handleCourseChange = () => {
    navigate('/courseSelection')
  }

  const handleLogout = () => {
      // Add your logout logic here (e.g., clear session or tokens)
      navigate('/login'); // Redirect back to login page after logging out
  }


  return (
    <>
      <div className="dashboard-container">
          <div className="dashboard-header">
              <img src={appLogo} alt="TF logo" className="dashboard-logo" />
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

      <div className="course-section">
          <p className="course-info">
              Selected Course: <strong>{selectedCourse || 'No course selected'}</strong>
          </p>
          <button className="change-course-button" onClick={handleCourseChange}>
             Change Course
          </button>
      </div>
    </>
  )
}

export default Dashboard
