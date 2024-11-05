/*import axios from 'axios';
import cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/course/list-courses'; // Replace with your actual API URL

async function getAllCourses() {
  const token = cookies.get('authToken'); // Replace 'authToken' with the actual cookie name
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

export { getAllCourses };*/

