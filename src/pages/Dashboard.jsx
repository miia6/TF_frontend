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

      <div className="dashboard-container">

          <h2>Teammates Finding </h2> 
          <p>View your project's applications or find your teammates by searching existing projects:</p>
          <div className="dashboard-link-container">
              <a href="/teammatesFinding">Teammates Finding</a>
          </div>


          <h2>Project Proposal</h2> 
          <p>Have an idea for project? Create a new project, where you can add students and students can apply to your project:</p>
          <div className="dashboard-link-container">
              <a href="/projectProposal">Project Proposal</a>
          </div>

          <h2>Project Finding</h2> 
          <p>Search existing projects and apply them:</p>
          <div className="dashboard-link-container">
              <a href="/projectFinding">Project Finding</a>
          </div>

      </div>
    </>
  )
}

export default Dashboard