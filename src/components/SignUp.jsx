import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ref,set,getDatabase } from 'firebase/database'
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';



export default function SignUp() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const [errorMessage,setErrorMessage] = useState("");


  function handleSubmit(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password) 
    .then(() => {
      writeUsersData(auth.currentUser.uid,name,email,"",new Date().toString())
      console.log(`User created successfully`)
      navigate('/profile')
    })
    .catch(e => {console.log(e)
      setErrorMessage(e.code.slice(e.code.indexOf('e')))
    })
   
  }

  function writeUsersData(userId,name,email,imageUrl,date) {
    const db = getDatabase();
    set(ref(db,'users/' + userId), {
      username: name,
      email:email,
      profile_picture: imageUrl,
      date 
    
    });
  
  }


  return (
    <div>
      <Header/>
       
  <Container>
    {
      errorMessage && <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
      <Alert.Heading>{errorMessage}</Alert.Heading>
      
    </Alert>
    }
      <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextUserName">
        <Form.Label column sm="3">
          Username
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={(e) => setName(e.target.value)}
          type='username' placeholder='enter username'/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control  onChange={(e) => setEmail(e.target.value)}
          type='email' placeholder='email'/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control  onChange={(e) => setPassword(e.target.value)}
           type="password" placeholder="Password" />
        </Col>
      </Form.Group>
      <Button type='submit'
      variant="primary">Submit</Button>
    </Form>
       <Link to={'/'}>need to login</Link>
  </Container>
    </div>
  )
}

