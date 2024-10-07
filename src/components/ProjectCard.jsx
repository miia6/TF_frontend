import React, { useState, useEffect } from 'react';

const ProjectCard = () => {
  return (
    <div className='project-card'>
      <div>Team</div>

      <div className='project-topic'>Topic</div>

      <div className='project-card-section'>
        Description
        <button className='project-card-read-more'>Read more</button>
      </div>

      <div className='project-card-section'>
        Searching for 4 members
        <button className='project-card-apply'>Apply</button>
      </div>
    </div>
  )
}

export default ProjectCard
