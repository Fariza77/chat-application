import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Container } from 'react-bootstrap';
import { onValue,ref,getDatabase } from 'firebase/database';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export default function Users() {
  const [users,setUsers] = useState(null);
  const navigate = useNavigate()

  function fetchUsers(){
    const db = getDatabase();
    onValue(ref(db,'users'),(usersData) => {
      let usersArray = [];
      usersData.forEach((user) => {
        usersArray.push(user)
        setUsers(usersArray)
      })
    })
  }

    
  useEffect(() => {
    fetchUsers()
  },[])
  return (
    <div>
      <Header/>
      <Container>

     {
        users?.map((user,index) => (
         <div key={index}>
          <h2>{user?.val()?.username}</h2>
          <p>{user?.val()?.email}</p>
          <p>{user?.val()?.date}</p>
          <Button onClick={() => navigate(`/chatroom/${user.key}`)}
      variant="primary">Chat</Button>
          <hr />
         </div>
        ))
      }
      </Container>
     
    </div>
  )
}
