import React, { useState, useEffect } from 'react'
import GroupsIcon from '@mui/icons-material/Groups'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const UserProjectCard = (
    { teamName, title, description, keywords, skills, teammates, setEditting }
) => {
    //console.log("Props received in UserProjectCard:", { teamName, title, description, teammates })
    const [showDescription, setShowDescription] = useState(false)

    const getShortDescription = (desc) => {
        const maxChars = 100
        return desc.length > maxChars ? desc.slice(0, maxChars) + '...' : desc
    }

    const descriptionCharCount = description.length
    const maxChars = 100

    return (
        <>
            <div className='user-project-card'>
                <div className='user-project-buttons-holder'>
                    <button className='user-project-util-button' onClick={() => setEditting(true)}>
                        <EditIcon />
                    </button>
                    <button className='user-project-util-button'>
                        <DeleteForeverIcon />
                    </button>
                </div>
                <h2>Your project</h2>
                <div className='user-project-card-header'>
                    <GroupsIcon className="user-project-group-icon" />
                    <div className='user-project-team-info'>
                        <div className='user-project-team-name'>Team: {teamName}</div>
                        <div className='user-project-teammates'>
                            Teammates: {teammates && teammates.length > 0 ? teammates : 'No teammates yet'}
                        </div>
                    </div>
                </div>

                <div className='user-project-topic-container'>
                    <div className='user-project-topic'>Topic: {title}</div>
                </div>

                <div className='user-project-card-section'>
                    <div className='user-project-description'>
                        <span className='user-project-card-subsection'>Description:</span> {showDescription ? description : getShortDescription(description)}
                    </div>
                    <div className='user-project-description'>
                        <span className='user-project-card-subsection'>Keywords: </span>{keywords || <span className='unspecified-info'>No keyword specified.</span>}
                    </div>
                    <div className='user-project-description'>
                        <span className='user-project-card-subsection'>Skills: </span>{skills || <span className='unspecified-info'>No required skills specified.</span>}
                    </div>
                    <button
                        className='user-project-card-read-more'
                        onClick={() => setShowDescription(!showDescription)}
                        disabled={descriptionCharCount <= 100}
                        style={{
                            opacity: descriptionCharCount <= maxChars ? 0.5 : 1,
                            cursor: descriptionCharCount <= maxChars ? 'not-allowed' : 'pointer'
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
