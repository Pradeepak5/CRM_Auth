import React,{useState,useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Table from 'react-bootstrap/Table';
import {url} from '../App'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button';

export default function Admin_Employee() {
    let [data,setData] = useState([])
    let token = sessionStorage.getItem('token')
    let navigate = useNavigate()
  
    let logout = ()=>{
        sessionStorage.clear()
        navigate('/')
    }

    const handleDelete = async (id) =>{
      try{
        const res = await fetch(`${url}/admin/employee/${id}`, {
          method: "DELETE"
        });
        const Data = await res.json();
        console.log(Data);
        toast.success(Data.message);
      }catch(err){
        console.log(err);
        toast.error(err.response.Data.message);
      }
    }
  
    let getData = async()=>{
      try {
        let res = await axios.get(`${url}/admin/employee`,{
          headers:{Authorization:`Bearer ${token}`}
        })
        toast.success(res.data.message)
        setData(res.data.employee)
      } catch (error) {
        if(error.response.status === 402 || error.response.status===400)
        {
          toast.error(error.response.data.message)
          logout()
        }
      }
    }
    useEffect(()=>{
      if(token){
        getData();
      } 
      else{
        logout()
      }
    },[])
    return <>
       <div style={{width:'100%',height:'50px',backgroundColor:'blue'}}>
        <ul style={{listStyleType:'none',display:'flex',flexDirection:'row',gap:'2%',padding:'10px'}}>
            <li>
                <Link to="/admindashboard" style={{color:"white",textDecoration:'none'}}>Manager</Link>
            </li>
            <li>
                <Link to="/adminemployee" style={{color:"white",textDecoration:'none'}}>Employee</Link>
            </li>
            <li>
              <Link to="/" style={{color:"white",textDecoration:'none'}}>Logout</Link>
            </li>
        </ul>
        </div> 
        <Button onClick={()=>getData()}>Refresh</Button>
      <h1 style={{textAlign:'center'}}>Employee</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.map((e,i)=>{
              return <tr key={e._id}>
                  <td>{i+1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.mobile}</td>
                  <td>{e.role}</td>
                  <td>
                   <button style={{backgroundColor:'red',color:'white'}} onClick={()=>handleDelete(e._id)}>Delete</button>
                   </td>
              </tr>
            })
          }
        </tbody>
      </Table>
      <Button style={{backgroundColor:'blue',color:'white'}} onClick={()=>navigate('/admin/add_employee')}>Create Employee</Button>
    </>
}
