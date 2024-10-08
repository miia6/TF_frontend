import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';

const ProjectCard = ({ teamName }) => {
  const [showDescription, setShowDescription] = useState(false)
  return (
    <div className='project-card'>
      <div className='project-card-header'>
        <GroupsIcon />
        <div className='team-name'>Team {teamName}</div>
      </div>

      <div className='project-topic-container'>
        <div className='project-topic'>Topic</div>
      </div>

      <div className='project-card-section'>
        Description
        <button
          className='project-card-read-more'
          onClick={() => setShowDescription(state => !state)}
        >Read more
        </button>
      </div>

      {showDescription &&
        <div className='project-card-description'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptatum assumenda unde fuga dolorum nihil molestias quibusdam dicta libero doloribus. Commodi accusantium officiis labore minus voluptas quasi mollitia ipsa alias.
        </div>
      }

      <div className='project-card-section'>
        Searching for 4 members
        <button className='project-card-apply'>Apply</button>
      </div>
    </div>
  )
}

export default ProjectCard
