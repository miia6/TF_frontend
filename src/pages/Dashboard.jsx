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
      // Add logic later
      navigate('/login') 
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
          <p>Selected course:</p>
          <h3 className="course-info">
              <strong>{selectedCourse || 'No course selected'}</strong>
          </h3>
          <button className="change-course-button" onClick={handleCourseChange}>
             Change Course
          </button>
      </div>

      <div className="content-container">
          <div className="info-section">
              <h3 className="teammatesfinding-header">
                Teammates Finding
              </h3> 
              <p className="teammatesfinding-info">
                View your project's applications or find your teammates by searching existing projects.
              </p>
              <a href="/teammatesFinding">Teammates Finding</a>

              <h3 className="projectproposal-header">
                Project Proposal
              </h3> 
              <p className="projectproposal-info">
                Have an idea for project? Create a new project, where you can add students and students can apply to your project. 
              </p>
              <a href="/projectProposal">Project Proposal</a>

              <h3 className="projectfinding-header">
                Project Finding
              </h3> 
              <p className="projectfinding-info">
                Search existing projects and apply them.
              </p>
              <a href="/projectFinding">Project Finding</a>
          </div>
      </div>
    </>
  )
}

export default Dashboard
