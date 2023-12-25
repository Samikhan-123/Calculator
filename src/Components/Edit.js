import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Edit = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      age: '',
      email: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[A-Za-z ]+$/, 'Name should only contain letters and spaces')
        .min(3).required('Name is required'),
      age: Yup.number()
        .integer('Age must be an integer')
        .min(18, 'Age must be at least 18')
        .max(60, 'Age must be at most 60')
        .required('Age is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`https://63f7af10e8a73b486afd4c29.mockapi.io/crud/${values.id}`, {
          name: values.name,
          age: values.age,
          email: values.email,
        });

        toast.success('Item successfully updated');
        navigate('/');
      } catch (error) {
        console.error('Update failed:', error);
        toast.error('Failed to update data');
        navigate('/edit');

      }
    },

  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { setValues } = formik;
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const age = parseInt(localStorage.getItem('age'), 10);
    const email = localStorage.getItem('email');

    setValues({ id, name, age, email });
  }, []);


  return (
    <>
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12 mx-auto">
          <div className="m-2">
            <Link to="/">
              <button type="button" className="btn btn-secondary mt-2 ">
                Read Data
              </button>
            </Link>
            <div className=" p-1 text-center">
              <h1 className="fw-bold p-3 m-0" style={{ color: 'white' }}>
                Update Data
              </h1>
            </div>
            <hr />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                name="name"
                id="name"
                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="age">Age :</label>
              <input
                type="number"
                name="age"
                id="age"
                className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`}
                placeholder="Enter Age"
                onChange={formik.handleChange}
                value={formik.values.age}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger">{formik.errors.age}</div>
              )}
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>
            <br />
            <div className="d-flex">
              <input
                type="submit"
                value="Update"
                className="btn btn-success"
              />
              <Link to="/" className="mx-2">
                <button type="button" className="btn btn-dark">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
