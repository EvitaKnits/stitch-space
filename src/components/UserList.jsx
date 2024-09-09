import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Get CSRF token from the cookie
const getCSRFToken = () => {
  const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return cookie ? cookie.split('=')[1] : null;
};

const UserList = () => {
  const [users, setUsers] = useState([]);  // State to hold the user data

  // Fetch users when the component mounts
  useEffect(() => {
    axios.get('https://8000-evitaknits-stitchspacea-7teiu88dgwp.ws.codeinstitute-ide.net/users/')
    .then(response => {
      console.log('Fetched data:', response.data);  // Log the fetched data
      setUsers(response.data);  // Update the state with fetched user data
    })
    .catch(error => {
      console.error('There was an error fetching the users:', error);  // Log the error
    });
  }, []);  // Empty array means this will only run once on component mount

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.first_name}</li>  // Display user's first name
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
