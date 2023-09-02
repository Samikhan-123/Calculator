import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Create = () => {
  const initialValues = {
    name: '',
    age: '',
    email: '',
  }
  const navigate = useNavigate()
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: initialValues,
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
              <button className="btn btn-secondary m-2">Read Data</button>
            </Link>
          <div className="bg-secondary p-4 text-center">
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
                className="form-control"
                placeholder="Enter Name"
                onChange={handleChange}
                required
              />
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age :</label>
              <input
                type="number"
                name="age"
                id=""
                className="form-control"
                placeholder="Enter Age"
                onChange={handleChange}
                required
              />
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
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
