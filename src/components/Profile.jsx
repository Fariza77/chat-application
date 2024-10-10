
import React, { useState,useEffect, useCallback } from 'react';
import Header from './Header';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { getAuth, signOut } from 'firebase/auth';
import { onValue,ref,getDatabase ,update} from 'firebase/database';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { Amplify } from 'aws-amplify';
import output from '../amplifyconfiguration.json';
import { uploadData } from 'aws-amplify/storage'

Amplify.configure(output)

export default function Profile() {
    const db = getDatabase();
    const auth = getAuth();
    const navigate = useNavigate();
    const [user,setUser] = useState("");
    const fileRef = useRef();
    const [file,setFile] = useState('');

    const userEmail = useCallback(() => {
      const auth = getAuth()
        onValue(ref(db,`users/`),(allUsers) => {
           allUsers.forEach(u => {
            if(u.key === auth?.currentUser?.uid){
              setUser(u.val())
            }
           })
            // localStorage.setItem('user',JSON.stringify(userSnapshot.val()))
        })
    },[user])

    useEffect(() => {
      userEmail()
    },[])

    function logUserOut(){
      signOut(auth)
      .then(() => navigate('/'))
      .catch(e => console.log(e))
    }

    function openGalery(){
      fileRef.current.click();
    }

    async function uploadFile(file){
      try {
        const result = await uploadData({
          path: file.name,
          data: file,
          options: {
            onProgress: ({ transferredBytes, totalBytes }) => {
              if (totalBytes) {
                console.log(
                  `Upload progress ${
                    Math.round((transferredBytes / totalBytes) * 100)
                  } %`
                );
              }
            }
          }
        }).result;
        console.log('Path from Response: ', result?.path);
        let imageUrl = `https://chatapp1bccf83f6ccae4dfb85c64edd85018aea99deb-dev.s3.amazonaws.com/${result?.path}`;
        console.log('image url',imageUrl)
        setFile(imageUrl);
        update.apply(ref(getDatabase(), `users/${ auth?.currentUser?.uid}`),{
          profile_picture: imageUrl
        })
       console.log('imageUrl',imageUrl)
      } catch (error) {
        console.log('Error : ', error);
      }
    }

  return (
    <div>
        <Container>
        <Header/>
        <div style={{height:60}}></div>
        <Image onClick={openGalery}
        style={{width:150}}
        src={ user?.profile_picture ? user?.profile_picture : require('../images/user.png') } roundedCircle />
        {/* <p>{getAuth().currentUser.username}</p> */}

        <input ref={fileRef}
        type="file"
        style={{display:'none'}}
        onChange={(e) => uploadFile (e.target.files[0])}/>
        <h1>{user?.username}</h1>
        <p>{user?.email}</p>
        <Button onClick={logUserOut}>Log Out</Button>
        </Container>

    </div>
  )
}
