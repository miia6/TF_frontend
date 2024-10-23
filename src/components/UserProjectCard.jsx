import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';

const UserProjectCard = ({ teamName, title, description, teammates }) => {
    const [showDescription, setShowDescription] = useState(false)

    const getShortDescription = (desc) => {
        const words = desc.split(' ')
        return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : desc
    }

    const descriptionWordCount = description.split(' ').length
    
    return (
        <>
            <div className='user-project-header'>
                <h1>Your project</h1>
            </div>
            <div className='user-project-card'>

                <div className='user-project-card-header'>
                    <GroupsIcon className="user-project-group-icon"/>
                    <div className='user-project-team-info'>
                        <div className='user-project-team-name'>Team: {teamName}</div>
                        <div className='user-project-teammates'>
                            {/* TO DO: see whether teammates are invited or members */}
                            Teammates: {teammates && teammates.length > 0 ? teammates.join(', ') : 'No teammates yet'}
                        </div>
                    </div>
                </div>

                <div className='user-project-topic-container'>
                    <div className='user-project-topic'>Topic: {title}</div>
                </div>

                <div className='user-project-card-section'>
                    <div className='user-project-description'>
                        {showDescription ? description : getShortDescription(description)}
                    </div>
                    <button
                        className='user-project-card-read-more'
                        onClick={() => setShowDescription(!showDescription)}
                        disabled={descriptionWordCount <= 10} 
                        style={{
                            opacity: descriptionWordCount <= 10 ? 0.5 : 1, // Dim the button
                            cursor: descriptionWordCount <= 10 ? 'not-allowed' : 'pointer' // Change cursor style
                        }}
                    >
                        {showDescription ? 'Show less' : 'Show more'}
                    </button>
                </div>

            </div>
        </>
    )
  }

export default UserProjectCard
