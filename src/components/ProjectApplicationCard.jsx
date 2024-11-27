import React, { useState } from 'react'

const ProjectApplicationCard = ({ title, userName, userEmail, status, appliedAt, applicationId, projectId, onAccept, onReject }) => {

    return (
        <>
            <div className="received-applications-card-container">
                <div className="received-applications-card">

                    <div className='received-applications-topic-container'>
                        <p>Project: {title}</p>
                    </div>

                    
                    <div className='received-applications-user-container'>
                        <div className='received-applications-user-header'> Applicant:</div>
                        <p>{userName} | {userEmail}</p>
                    </div>

                    <div className='received-applications-info-container'>
                        <div className='received-applications-info-header'> Application info: </div>
                        <p>Status: <span className={`status ${status.toLowerCase()}`}>{status}</span></p>
                        <p>Applied at: {appliedAt}</p>
                    </div>

                    <div className="received-applications-action-buttons">
                        {status === 'PENDING' && (
                            <>
                                <button 
                                    className='received-applications-apply-button' 
                                    onClick={onAccept}>
                                    Accept
                                </button>
                                <button 
                                    className='received-applications-reject-button' 
                                    onClick={onReject}>
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

export default ProjectApplicationCard
