import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import TFmenu from '../components/TFmenu'
import '../styles/applications.css'
import { useNavigate } from 'react-router-dom'

const Applications = () => {
    const navigate = useNavigate()
    const [course, setCourse] = useState('')

    useEffect(() => {
        setCourse(localStorage.getItem('selectedCourse'))
    }, [])

    const handleCourseChange = () => {
        navigate('/courseSelection')
    }

    return (
        <>
            <div className="course-section">
                <p>Selected course:</p>
                <h3 className="course-info">
                    <strong>{course || 'No course selected'}</strong>
                </h3>
                <button className="change-course-button" onClick={handleCourseChange}>
                    Change Course
                </button>
            </div>
        
            <div className='applications'>
                <TFmenu />

                {/*<div className='course'>{course}</div>*/}

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
        </>
    )
}

export default Applications
