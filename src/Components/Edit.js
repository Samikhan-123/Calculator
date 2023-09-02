import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
const Edit = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      id: '0',
      name: '',
      age: '',
      email: '',
    },
    onSubmit: (values) => {
      axios
        .put(`https://63f7af10e8a73b486afd4c29.mockapi.io/crud/${values.id}`, {
          name: values.name,
          age: values.age,
          email: values.email,
        })
        .then((response) => {
          console.log(response.data)
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  })
  useEffect(() => {
    const id = localStorage.getItem('id')
    const name = localStorage.getItem('name')
    const age = localStorage.getItem('age')
    const email = localStorage.getItem('email')

    formik.setValues({ id, name, age, email })
  }, [])

  return (
    <>
      <div className="row">
        <div className="col md-4">
          <div className="m-2">
            <Link to="/">
              <button type="button" className="btn btn-secondary m-2">
                Read Data
              </button>
            </Link>
            <div className="bg-secondary p-4 text-center">
              <h1 className="fw-bold" style={{color:'white'}}>Update Data</h1>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                name="name"
                id=""
                className="form-control"
                placeholder="Enter Name"
                onChange={formik.handleChange}
                value={formik.values.name}
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
                onChange={formik.handleChange}
                value={formik.values.age}
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
                onChange={formik.handleChange}
                value={formik.values.email}
               />
            </div>
            <br />
            <div  className="d-flex">
              <input
                type="submit"
                value="Update"
                className="btn btn-secondary"
              />
              <Link to = '/' className='mx-2'>
              <input
                  type="submit"
                  value="Back"
                  className="btn btn-dark"
                />   
                </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit
