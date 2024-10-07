import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectProposalForm from '../components/ProjectProposalForm'
import ProjectCard from '../components/ProjectCard'
import '../styles/projectfinding.css'
import Grid from '@mui/material/Grid';

const ProjectFinding = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Grid container spacing={2}>
                {[1, 2, 3, 4, 5].map(
                    x => <Grid item xs={4}>
                        <ProjectCard />
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default ProjectFinding

//nho phai mo truoc khi hut thong minh