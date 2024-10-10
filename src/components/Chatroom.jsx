import React, { useCallback, useEffect, useState } from 'react'
import Header from './Header';
import { Container } from 'react-bootstrap';
import { onValue,ref,getDatabase,push } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FaRegTrashAlt } from "react-icons/fa";
import {remove } from 'firebase/database';
import { FaEdit } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { useRef } from 'react'


export default function Chatroom() {
  const [users,setUsers] = useState(null);
  const [chats,setChats] = useState([]);
  const [message,setMessage] = useState("")
  const { id } = useParams();
  const uid = getAuth().currentUser.uid;
  const scrollRef = useRef()
  const fileRef = useRef()

  function handleSubmit(e){
      e.preventDefault();
      const db = getDatabase()
      push(ref(db,`chat`),{
        message,
        senderId : uid,
        receiverId : id,
        date : new Date().toString()
      })
     setMessage("")
     scrollRef?.current?.scrollIntoView({ behaviour:'smooth',block:'end' })

    }
    const displayUser = useCallback(() => {
      const db = getDatabase()
      onValue(ref(db,`users/${id}`),(userSnapshot) => {
        setUsers(userSnapshot.val())

      })
    },[users])

      const displayChats = useCallback(() => {
        const db = getDatabase()
        onValue(ref(db,`chat`),(chatsSnapshot) => {
          let chatsArray = [];
          chatsSnapshot.forEach(chat => {
           if(chat?.val()?.senderId === uid && chat?.val()?.receiverId === id ||
           chat?.val()?.senderId === id && chat?.val()?.receiverId === uid
           ){
              chatsArray.push(chat)
            }
          })
          setChats(chatsArray)
        })
        
      },[])
      function removeChat(key){
        remove(ref(getDatabase(), `chat/${key}`))
      }
     
    
    useEffect(() => {
      displayUser();
      displayChats();
    },[])
    function openGallery(){
      fileRef.current.click()
    }
    
  return (
    <div>
      <Header/>
     <Container>
    
    <h1>{users?.username}</h1>
    <input ref={fileRef}
    type="file" 
    style={{display:'none'}}/>
    </Container>
      {
        chats?.map((chat,index) => (
          <div id="chat-box"
          ref={scrollRef}
         
          key={index}>{chat?.val().message}
          
          
         <FaRegTrashAlt onClick={() => removeChat(chat.key)}/>
         {/* <FaEdit /> */}
          </div>
        ))
      }

    <form id="chat-form"
    onSubmit={handleSubmit}>
      <input value={message}
      id="chat-input"
      onChange={(e) => setMessage(e.target.value)}
      type="text"placeholder='type...' required/>
      <button onClick={openGallery}
       type="button"><FaImages style={{width:'75px'}}/></button>
      <button id="chat-btn"
      type='submit'>send</button>
    </form>
     
    </div>
  )
}
