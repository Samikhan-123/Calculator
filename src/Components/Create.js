import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'; 
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Create = () => {
  const initialValues = {
    name: '',
    age: '',
    email: '',
  }

  //  the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('Name is required'),
    age: Yup.number().required('Age is required').positive('Age must be a positive number'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });
  const navigate = useNavigate()
  const {handleSubmit, handleChange, errors, touched} = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      axios
        .post('https://63f7af10e8a73b486afd4c29.mockapi.io/crud', values)
        .then((response) => {
          console.log(response.data)
          navigate('/');
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
  return (
    <>
      <div className="row">
        <div className="col md-4">
        <div className="m-2 my-form">
            <Link to="/">
              <button className="btn btn-secondary mt-2 mb-2">Read Data</button>
            </Link>
          <div className=" p-4 text-center">
            <h1 className='fw-bold' style={{color:'white'}}>Create Data</h1>
          </div>       
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                name="name"
                id=""
                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                placeholder="Your Full Name"
                onChange={handleChange}
                required
              />
              <div style={{color:'red'}} className="invalid-feedback">{touched.name && errors.name}</div>

              <br />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age :</label>
              <input
                type="number"
                name="age"
                id=""
                className="form-control"
                placeholder="Your Age"
                onChange={handleChange}
                required
              />
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="Your Email">Email :</label>
              <input
                type="email"
                name="email"
                id=""
                className="form-control"
                placeholder="Enter Email"
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="d-grid">
              <input
                type="submit"
                name=""
                value="Submit"
                className="btn btn-secondary"
              />
            </div>
          </form>
         
        </div>
      </div>
    </>
  )
}

export default Create
