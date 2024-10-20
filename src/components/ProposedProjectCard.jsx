import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';

/* 
ProjectCard component is used to display project from all users.
ProposedProjectCard component is used to display only projects belong to the logged in user.
Let's choose better names for these later.
*/
// TODO: pick better name
const ProposedProjectCard = ({ teamName }) => {
    const [showDescription, setShowDescription] = useState(false)
    return (
        <div className='project-card'>
            <div className='project-card-header'>
                <GroupsIcon />
                <div className='team-name'>{teamName}</div>
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
        </div>
    )
}

export default ProposedProjectCard
