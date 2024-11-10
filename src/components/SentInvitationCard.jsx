import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import GroupsIcon from '@mui/icons-material/Groups'

import { applyToProject } from '../services/project'

import '../styles/sentinvitations.css'

const SentInvitationCard = ({ inviteeID, inviteeName, inviteeHasProject }) => {

    return (
        <div className="sent-invitation-card">
            <p>Name: {inviteeName}</p>
            <p>Status: {inviteeHasProject ? "Unavailable" : "Available"}</p>
        </div>
    )
}

export default SentInvitationCard
