import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import GroupsIcon from '@mui/icons-material/Groups'

import '../styles/sentinvitations.css'

const SentInvitationCard = ({ title, userName, userEmail, status, createdAt }) => {

    return (
<>
            <div className="sent-invitation-card-container">
                <div className="sent-invitation-card">

                    <div className='sent-invitation-topic-container'>
                        <p>Project: {title}</p>
                    </div>

                    
                    <div className='sent-invitation-user-container'>
                        <div className='sent-invitation-user-header'> Invited user:</div>
                        <p>{userName} | {userEmail}</p>
                    </div>

                    <div className='sent-invitation-info-container'>
                        <div className='sent-invitation-info-header'> Application info: </div>
                        <p>Status: <span className={`status ${status.toLowerCase()}`}>{status}</span></p>
                        <p>Created at: {createdAt}</p>
                        {/*acceptedAt && <p>Accepted at: {acceptedAt}</p>*/}
                    </div>

                </div>
            </div>
        </>
    )
}

export default SentInvitationCard
