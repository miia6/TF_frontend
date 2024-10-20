import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import TFToolbar from '../components/TFToolbar'
import '../styles/applications.css'
import { useNavigate } from 'react-router-dom'

const Applications = () => {
    const navigate = useNavigate()
    const [course, setCourse] = useState('')

    useEffect(() => {
        setCourse(localStorage.getItem('selectedCourse'))
    }, [])

    return (
        <div className='applications'>
            <TFToolbar />

            <div className='course'>{course}</div>

            <div className='project-card'>
                <div className='project-card-header'>
                    <GroupsIcon />
                    <div className='team-name'>Team name</div>
                </div>

                <div className='project-topic-container'>
                    <div className='project-topic'>Topic</div>
                </div>

                <div className='project-card-section'>
                    Applications
                </div>

                <div className='project-card-description'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptatum assumenda unde fuga dolorum nihil molestias quibusdam dicta libero doloribus. Commodi accusantium officiis labore minus voluptas quasi mollitia ipsa alias.
                </div>

                <button
                    className='project-card-read-more'
                    onClick={() => navigate('/teammatesFinding')}
                >
                    Back to teammates finding
                </button>
            </div>
        </div>
    )
}

export default Applications
