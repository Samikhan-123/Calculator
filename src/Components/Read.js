import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Read = () => {
  const [data, setData] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((item) => {
    const { name, age, email } = item;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(lowerSearchTerm) ||
      age.toString().includes(searchTerm) ||
      email.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const apiData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://63f7af10e8a73b486afd4c29.mockapi.io/crud'
      );
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://63f7af10e8a73b486afd4c29.mockapi.io/crud/${id}`)
      .then(() => {
        apiData();
        console.log(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setDataToLocalStorage = (id, name, age, email) => {
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('age', age);
    localStorage.setItem('email', email);
  };

  return (
    <>
      <div className="row main-crud">
        <div className="col-lg-12 col-md-10">
          <div className="mt-3 mb-3">
            <div className="form-check form-switch m-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={isDark}
                onChange={(e) => setIsDark(e.target.checked)}
              />
              <label className="form-check-label">Theme</label>
            </div>
            <Link to="/create" className="btn btn-secondary">
              Create New Data
            </Link>
            <form>
              <input
                className="input"
                type="text"
                name="search"
                placeholder="Search item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          {isLoading ? (
            <p>Loading data...</p>
          ) : (
            <div className="table-responsive">
              {filteredData.length === 0 ? (
                <p>No data found.</p>
              ) : (
                <table
                  className={`read-table table ${isDark ? 'table-dark' : 'table-light'
                    } table-striped table-bordered table-hover`}
                >
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Email</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.id}>
                        <td data-label="Id">{item.id}</td>
                        <td data-label="Name">{item.name}</td>
                        <td data-label="Age">{item.age}</td>
                        <td data-label="Email">{item.email}</td>
                        <td data-label="Edit">
                          <Link to="/edit">
                            <button
                              className="btn btn-primary edit"
                              onClick={() => {
                                setDataToLocalStorage(
                                  item.id,
                                  item.name,
                                  item.age,
                                  item.email
                                );
                              }}
                            >
                              Edit
                            </button>
                          </Link>
                        </td>
                        <td data-label="Delete">
                          <button
                            className="btn btn-danger delete"
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure to delete data?'
                                )
                              ) {
                                handleDelete(item.id);
                                toast.success(`ID ${item.id} Successfully Deleted`);

                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Read;
