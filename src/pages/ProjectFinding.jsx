//import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'

import '../styles/dashboard.css'
import Grid from '@mui/material/Grid';
import { getProjects } from '../services/project'
import '../styles/projectfinding.css'
import { useEffect, useState } from 'react';

const ProjectFinding = () => {
    const navigate = useNavigate()
    const [course, setCourse] = useState('')
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setCourse(localStorage.getItem('selectedCourse'))
    }, [])

    const handleLogout = () => {
        // Add your logout logic here (e.g., clear session or tokens)
        navigate('/login'); // Redirect back to login page after logging out
    }

    useEffect(() => {
        if (!course) {
            return
        }
        getProjects(course).then((projects) => {
            setProjects(projects)
            console.log(projects)
        })
    }, [course])


    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const term = event.target.value
        setSearchTerm(term)
    }

    return (
        <>
            < TFmenu />
            < CourseInfo />

            <div className="project-finding-buttons">
                <button onClick={() => navigate('/projectSearch')} className="project-finding-button">
                    Search projects
                </button>
                <button onClick={() => navigate('/yourProject')} className="project-finding-button">
                    Your project
                </button>
                <button onClick={() => navigate('/sentApplications')} className="project-finding-button">
                    Sent applications
                </button>
                <button onClick={() => navigate('/projectApplications')} className="project-finding-button">
                    Project applications
                </button>
                <button onClick={() => navigate('/projectInvitations')} className="project-finding-button">
                    Project Invitations
                </button>
                <button onClick={() => navigate('/sentInvitations')} className="project-finding-button">
                    Sent invitations
                </button>

            </div>
        </>
    )
}

export default ProjectFinding
