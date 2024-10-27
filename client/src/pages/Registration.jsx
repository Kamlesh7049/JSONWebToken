import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from 'axios';
import {message} from 'antd'
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [input,setInput]=useState({});
    const navigate=useNavigate();

    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setInput(values=>({...values,[name]:value}));
        console.log(input)
        
    }
   const handleSubmit=(e)=>{
    e.preventDefault();
    let api="http://localhost:8080/user/registration";
    axios.post(api,input).then((res)=>{
        console.log(res);
        message.success("You are Successfully Registrered!")
        navigate("/login");
    })

   }



  return (
    <div id="loginpage">
      <h4>User Registration</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="text-end">Enter Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={input.name}
            onChange={handleInput}
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-end">Email address</Form.Label>
          <Form.Control
            className="input-box"
            type="email"
            name="email"
            value={input.email}
            onChange={handleInput}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-end">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={input.password}
            onChange={handleInput}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Registration;
