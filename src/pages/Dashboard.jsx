import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'

const Dashboard = () => {

  return (
    <>
      <TFmenu/>
      <CourseInfo/>

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