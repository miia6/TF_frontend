import React, { useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups'

const ProjectInvitationCard = ({ title, teamName, description, status, createdAt, invitationId, projectId, onAccept, onReject, isMember }) => {
    const [showDescription, setShowDescription] = useState(false)

    const getShortDescription = (desc) => {
        const maxChars = 70
        return desc.length > maxChars ? desc.slice(0, maxChars) + '...' : desc
    }

    const descriptionCharCount = description.length
    const maxChars = 70

    const handleAcceptClick = () => {
        const confirmation = window.confirm(`Are you sure you want to accept the invitation?`)
        if (confirmation) {
            onAccept()
        }
    }

    const handleRejectClick = () => {
        const confirmation = window.confirm(`Are you sure you want to reject the invitation?`)
        if (confirmation) {
            onReject()
        }
    }

    return (
        <>
            <div className="received-invitation-card-container">
                <div className='received-invitation-card'>

                    <div className="received-invitation-card-header">
                        <GroupsIcon className="received-invitation-group-icon"/>
                        <div className='received-invitation-team-name'>Team: {teamName}</div>
                    </div>

                    <div className='received-invitation-topic-container'>
                        <div className='received-invitation-topic'>Topic: {title}</div>
                    </div>

                    <div className='received-invitation-card-section'>
                        <div className='received-invitation-description'>
                            {showDescription ? description : getShortDescription(description)}
                        </div>
                        <button
                            className='received-invitation-card-read-more'
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

                    <div className='received-invitation-info-container'>
                        <div className='received-invitation-info-header'> Invitation info: </div>
                        <p>Status: <span className={`status ${status.toLowerCase()}`}>{status}</span></p>
                        <p>Created at: {createdAt}</p>
                    </div>

                    <div className="received-invitation-action-buttons">
                        {status === 'PENDING' && !isMember && (
                            <>
                                <button 
                                    className='received-invitation-apply-button' 
                                    onClick={handleAcceptClick}>
                                    Accept
                                </button>
                                <button 
                                    className='received-invitation-reject-button' 
                                    onClick={handleRejectClick}>
                                    Reject
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectInvitationCard
