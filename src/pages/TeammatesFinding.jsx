import React from 'react'

import TFmenu from '../components/TFmenu'
import TeammatesFindingForm from '../components/TeammatesFindingForm'

import '../styles/teammatesfinding.css'

const TeammatesFinding = () => {
   
    return (
        <>
            < TFmenu />
            <div className="teammates-finding-container">
            < TeammatesFindingForm />
            </div>
        </>
    )
}

export default TeammatesFinding
