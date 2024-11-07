import React, { useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups'

import '../styles/sentapplicationcard.css'

const SentApplicationCard = ({ projectId, teamName, title, description, status, createdDate }) => {
    const [showDescription, setShowDescription] = useState(false)

    const getShortDescription = (desc) => {
        const maxChars = 70
        return desc.length > maxChars ? desc.slice(0, maxChars) + '...' : desc
    }

    const descriptionCharCount = description.length
    const maxChars = 70

    return (
        <>
            <div className="sent-application-card-container">
                <div className="sent-application-card">

                    <div className='sent-application-card-header'>
                        <GroupsIcon className="sent-application-group-icon" />
                        <div className='sent-application-team-name'>Team: {teamName}</div>
                    </div>

                    <div className='sent-application-topic-container'>
                        <div className='sent-application-topic'>Title: {title}</div>
                    </div>

                    <div className='sent-application-description-section'>
                        <div className='sent-application-description'>
                            {showDescription ? description : getShortDescription(description)}
                        </div>
                        <button
                            className='sent-application-read-more'
                            onClick={() => setShowDescription(!showDescription)}
                            disabled={descriptionCharCount <= 70} 
                            style={{
                                opacity: descriptionCharCount <= maxChars ? 0.5 : 1, 
                                cursor: descriptionCharCount <= maxChars ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {showDescription ? 'Show less' : 'Show more'}
                        </button>
                    </div>

                    <div className='sent-application-info'>
                        <p>Status: <span className={`status ${status.toLowerCase()}`}>{status}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SentApplicationCard
