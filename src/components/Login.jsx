import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';



export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const [errorMessage,setErrorMessage] = useState("")

  function handleSubmit(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    .then(() => {
      console.log(`User logged in successfully`)
      navigate('/profile')
    })
    .catch(e => {console.log(e)
      setErrorMessage(e.code.slice(e.code.indexOf('i')))
    })
   
  }
  return (
    <div>
      <Header/>
      {
        errorMessage &&  <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
        <Alert.Heading>{errorMessage}</Alert.Heading>
        
      </Alert>
      }
      <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={(e) => setEmail(e.target.value)}
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
      variant="primary">login</Button>
      
    </Form>
        <Link to={'/signup'}>need an account</Link>
            <br />
            <Link to={'/password'}>forgot password</Link>
      
    </div>
  )
}
