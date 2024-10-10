import React, { useState } from 'react';
import Header from './Header';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { sendPasswordResetEmail,getAuth } from 'firebase/auth';


export default function Password() {
  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("")
  const auth = getAuth();

  function handleSubmit(e){
    e.preventDefault()
    sendPasswordResetEmail(auth,email)
    .then(() => {
      setMessage(`Password reset link has been emailed successfully`)
     
    })
    .catch(e => {
      console.log(e)
      setMessage(e.code)
    })
  }
  return (
    <div>
      <Header/>
      <Form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control  onChange={(e) => setEmail(e.target.value)}
          type='email' placeholder='email'/>
        </Col>
      </Form.Group>
      <Button type='submit'
      variant="primary">Send</Button>
      </Form>
    </div>
  )
}
