import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeammatesFindingForm from '../components/TeammatesFindingForm'
import '../styles/teammatesfinding.css'
import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'

const TeammatesFinding = () => {
    const navigate = useNavigate()

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
            < CourseInfo />
            <div className="teammates-finding-container">
            <TeammatesFindingForm
                handleTeammatesFinding={handleTeammatesFinding}
            />
            </div>
        </>
    )
}

export default TeammatesFinding
