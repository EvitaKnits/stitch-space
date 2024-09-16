import { useEffect, useState } from 'react';
import {axiosClient} from '../../api/axiosDefaults';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const UserList = () => {
  const [users, setUsers] = useState([]);  // State to hold the user data

  // Fetch users when the component mounts
  useEffect(() => {
    axiosClient.get('/users/')
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
      <Badge bg="danger" as={Button}>
          New
        </Badge>
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
