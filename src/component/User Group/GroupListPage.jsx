import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupCard from './GroupCard';

const GroupListPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
}, []);

const fetchGroups = async () => {
    try {
        const response = await axios.get('http://localhost:5000/groups/groups');
        setGroups(response.data.data);
    } catch (error) {
        console.error('Error fetching groups:', error);
    }
};

console.log(groups)
  return (
    <div >
      <h1>My Groups</h1>
      {groups.length === 0 ? (
        <p>No groups found.</p>
      ) : (
        <div>
          {groups.map(group => (
            <GroupCard key={group._id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupListPage;
