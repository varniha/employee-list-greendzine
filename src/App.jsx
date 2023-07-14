import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list">
    <div class="header">
      <b>EMPLOYEE LIST</b>
    </div>
    <div className='search'>
        <input type="text"
        placeholder='Search...'
        value={searchTerm}
        onChange={handleSearch}/>
      </div>
      <br></br>
      {filteredUsers.map(user => (
        <div className="card" key={user.id}>
          <div className="avatar-container">
            <div className="id">{user.id}</div>
            <img src={user.avatar} alt={user.first_name} className="avatar" />
          </div>
          <div className="name">{user.first_name}</div>
        </div>
      ))}
    </div>
  
  );
};

export default App;
