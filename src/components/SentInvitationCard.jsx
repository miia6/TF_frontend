import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import GroupsIcon from '@mui/icons-material/Groups'

import { applyToProject } from '../services/project'

import '../styles/sentinvitations.css'

const SentInvitationCard = ({ inviteeName, invited, handleInvite }) => {

    return (
        <div className="sent-invitation-card">
            { /* Feel free to add more details or stylings to the card. */}
            <p>Name: {inviteeName}</p>
            <p>Skills: JavaScript, HTML, CSS</p>
            {!invited ? <button
                className="sent-invitation-button"
                onClick={handleInvite}
            >
                Invite
            </button> : null}
        </div>
    )
}

export default SentInvitationCard
