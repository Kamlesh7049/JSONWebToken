import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    let status=localStorage.getItem("userValid")
    if(status)
    {
      navigate("/dashboard");
    }
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault();
    let api="http://localhost:8080/user/userlogin";
    axios.post(api,{email:email,password:password}).then((res)=>{
      console.log(res.data);


      localStorage.setItem("auth-token",res.data.token)
      localStorage.setItem("username",res.data.user.username);

      navigate("/dashboard");
    })
  }

  return (
    <>
      <div id="loginpage">
        <h4>User Login</h4>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-end">Email address</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-end">Password</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};
export default Home;
