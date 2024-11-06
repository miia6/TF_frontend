import React, { useState } from 'react'

import TeammatesFindingForm from '../components/TeammatesFindingForm'
import TFmenu from '../components/TFmenu'

import '../styles/teammatesfinding.css'

const TeammatesFinding = () => {

    const handleTeammatesFinding = (user) => {
        if (user) {
            console.log('showing user: ' + user)
        } else {
            // add error handling
            console.log("no user searched")
        }
    }

    return (
        <>
            < TFmenu />
            <div className="teammates-finding-container">
            <TeammatesFindingForm
                handleTeammatesFinding={handleTeammatesFinding}
            />
            </div>
        </>
    )
}

export default TeammatesFinding
