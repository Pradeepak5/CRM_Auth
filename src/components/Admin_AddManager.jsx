import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { url } from '../App';
import { toast } from 'react-toastify'
import axios from 'axios';
import * as yup from 'yup';


export default function Admin_AddManager() {

  const navigate = useNavigate();

  const managerFormValidateSchema = object({
    name: string().required("Please enter manager name"),
    email: yup.string().email().required("Please enter email"),
    mobile: string().required("enter manager mobile number"),
    password: string().required("password is must")
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: ""
    },
    validationSchema: managerFormValidateSchema,
    onSubmit: (newManager) => {
      AddNewManager(newManager);
      navigate('/admindashboard');
    }
  });

  const AddNewManager = async (newManager) => {
    console.log(newManager)
    try {
        const res = await axios.post(`${url}/admin/addmanager`, newManager);
        toast.success(res.data.message)
        console.log(res);
      } catch (error) {
        if(error.response.status === 402 || error.response.status===400)
        {
          toast.error(error.response.data.message)
        }
      }
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className='add-book-form'
        onSubmit={handleSubmit}
      >
        <TextField id="outlined-basic" label="Name" variant="outlined" value={values.name} name='name' onChange={handleChange} onBlur={handleBlur} touched />
        {touched.name && errors.name ? <p style={{ color: 'crimson' }}>{errors.name}</p> : ""}
        <TextField id="outlined-basic" label="Email" variant="outlined" value={values.email} name='email' onChange={handleChange} onBlur={handleBlur} touched />
        {touched.email && errors.email ? <p style={{ color: 'crimson' }}>{errors.email}</p> : ""}
        <TextField id="outlined-basic" label="Mobile" variant="outlined" value={values.mobile} name='mobile' onChange={handleChange} onBlur={handleBlur} touched />
        {touched.mobile && errors.mobile ? <p style={{ color: 'crimson' }}>{errors.mobile}</p> : ""}
        <TextField id="outlined-basic" label="Password" variant="outlined" value={values.password} name='password' onChange={handleChange} onBlur={handleBlur} touched />
        {touched.password && errors.password ? <p style={{ color: 'crimson' }}>{errors.password}</p> : ""}
        <Button type='submit' variant='contained'>Add Manager</Button>
        <button type="button" className='btn btn-danger' onClick={()=>navigate('/admindashboard')}>Cancel</button>
      </Box>
    </div>
  );
}
