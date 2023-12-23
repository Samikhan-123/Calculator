import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Create = () => {
  const initialValues = {
    name: '',
    age: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().matches(/^[A-Za-z ]+$/, 'Name should only contain letters and spaces')
      .min(3).required('Name is required'),
    age: Yup.number()
      .integer('Age must be an integer')
      .min(18, 'Age must be at least 18')
      .max(60, 'Age must be at most 60')
      // .moreThan(0, 'Age must be a positive number')
      .required('Age is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const navigate = useNavigate();
  const { handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      axios
        .post('https://63f7af10e8a73b486afd4c29.mockapi.io/crud', values)
        .then((response) => {
          console.log(response.data);
          navigate('/');
          toast.success('Item Successfully Created');

        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12 mx-auto">
          <div className="m-2 my-form">
            <Link to="/">
              <button className="btn btn-secondary mt-2 mb-2">Read Data</button>
            </Link>
            <div className=" p-4 text-center">
              <h1 className="fw-bold" style={{ color: 'white' }}>
                Create Data
              </h1>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                name="name"
                autoComplete="name" // Add autocomplete attribute
                id="name"
                className={`form-control ${touched.name && errors.name ? 'is-invalid' : touched.name && !errors.name ? 'is-valid' : ''}`}
                placeholder="Your Full Name"
                onChange={handleChange}
              />
              <div style={{ color: 'red' }} className="invalid-feedback">
                {touched.name && errors.name}
              </div>
              <div style={{ color: 'green' }} className="valid-feedback">
                {touched.name && !errors.name && 'Looks good!'}
              </div>
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age :</label>
              <input
                type="number"
                name="age"
                id="age"
                className={`form-control ${touched.age && errors.age ? 'is-invalid' : touched.age && !errors.age ? 'is-valid' : ''}`}
                placeholder="Your Age"
                onChange={handleChange}
              />
              <div style={{ color: 'red' }} className="invalid-feedback">
                {touched.age && errors.age}
              </div>
              <div style={{ color: 'green' }} className="valid-feedback">
                {touched.age && !errors.age && 'Looks good!'}
              </div>
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email" // Add autocomplete attribute
                className={`form-control ${touched.email && errors.email ? 'is-invalid' : touched.email && !errors.email ? 'is-valid' : ''}`}
                placeholder="Enter Email"
                onChange={handleChange}
              />
              <div style={{ color: 'red' }} className="invalid-feedback">
                {touched.email && errors.email}
              </div>
              <div style={{ color: 'green' }} className="valid-feedback">
                {touched.email && !errors.email && 'Looks good!'}
              </div>
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
  );
};

export default Create;
