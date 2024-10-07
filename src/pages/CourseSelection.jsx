import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseSelectionForm from '../components/CourseSelectionForm'
import '../styles/courseselection.css'

const CourseSelection = () => {
    const navigate = useNavigate()
  
    const handleCourseSelection = (course) => {
        console.log("ÄÄÄ " + course)
        navigate('/dashboard')
      /*if (course) {
        //localStorage.setItem('selectedCourse', course)
        console.log("Course selected:", course)
        navigate('/dashboard')
      } else {
        console.log("No course selected")
      }*/
    }
  
    return (
      <div className="course-selection-container">
         <CourseSelectionForm 
            handleCourseSelection={handleCourseSelection} />
      </div>
    )
  }
  
  export default CourseSelection