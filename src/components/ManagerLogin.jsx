import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import {url} from '../App'
import { toast } from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';

export default function ManagerLogin() {
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let navigate = useNavigate()

  useEffect(()=>{
    sessionStorage.clear()
  },[])

  let handleLogin =async()=>{
    
    let payload = {email,password};
    console.log(payload)
    try {
      let res = await axios.post(`${url}/manager/login`,payload)
      console.log(res);
      toast.success(res.data.message)
      sessionStorage.setItem('token',res.data.token)
      navigate('/manager/dashboard')

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <div className='login-wrapper'>
      <h1 style={{"textAlign":"center"}}>Manager Login Here!</h1>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>

      <div style={{display:'flex',flexDirection:'row',gap:'10%',fontSize:'1.5em'}}>
      <Form.Group className="mb-3">
        <Link to='/' style={{textDecoration:'none'}}>Admin?</Link>
      </Form.Group>

      <Form.Group className="mb-3">
        <Link to='/employee' style={{textDecoration:'none'}}>Employee?</Link>
      </Form.Group>
      </div>
     
      <Button variant="primary" onClick={()=>handleLogin()}>
        Login
      </Button>
    </Form>
    </div>
    </div>
  )
}
