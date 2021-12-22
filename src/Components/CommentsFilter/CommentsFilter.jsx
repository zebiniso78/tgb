import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import './CommentsFilter.css';

function CommentsFilter() {
  const [datalist, setDatalist] = useState([]);
  const [filtrcat, setFiltrcat] = useState([]);

  // Form inputs
  const [fromdate, setFromdate] = useState('');
  const [todate, setTodate] = useState('');
  const [category, setCategory] = useState('');
  const [rtype, setRtype] = useState('');
  // end form inputs

  const navigate = useNavigate();
  let bodyFormData = new FormData();
  bodyFormData.append('category', 'all');
  bodyFormData.append('type', 'all');

  useEffect(() => {
    setRtype('all');
    setCategory('all');
    axios({
      method: 'post',
      url: 'http://192.168.43.165:1122/api/main',
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response);
        const data = response.data;
        setDatalist(data);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  }, [setDatalist]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://192.168.43.165:1122/api/category',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response);
        const data = response.data;
        console.log(data);
        setFiltrcat(data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  }, [setFiltrcat]);

  function handleSubmit(event) {
    event.preventDefault();
    let data = {
      from_date: fromdate,
      to_date: todate,
      category: category,
      type: rtype,
    };
    let bodyFormData = new FormData();
    bodyFormData.append('category', category);
    bodyFormData.append('type', rtype);
    bodyFormData.append('s_date', fromdate);
    bodyFormData.append('e_date', todate);
    // there should be axios

    axios({
      method: 'post',
      url: 'http://192.168.43.165:1122/api/main',
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response);
        const data = response.data;
        setDatalist(data);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      });
    console.log(data);
  }

  function handleDate(event) {
    let date = event.target.value;
    setFromdate(date);
  }
  function handleToDate(event) {
    let date = event.target.value;
    setTodate(date);
  }
  function handleCategory(event) {
    let cat = event.target.value;
    setCategory(cat);
  }
  function handleType(event) {
    let type = event.target.value;
    setRtype(type);
  }

  return (
    <>
      <div className="card my-5">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <div className="form-group">
                  <label for="date"> Date </label>
                  <input
                    type="date"
                    className="form-control"
                    value={fromdate}
                    onChange={handleDate}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <label for="t_date"> Date To </label>
                  <input
                    type="date"
                    className="form-control"
                    value={todate}
                    onChange={handleToDate}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <label for="date"> Category </label>
                  <select
                    name="category"
                    id="category"
                    className="form-control"
                    onChange={handleCategory}
                    value={category}
                  >
                    <option value="all">All</option>
                    {filtrcat.map((item) => (
                      <option value={item.id}> {item.name} </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <label for="type"> Type </label>
                  <select
                    name="type"
                    id="type"
                    className="form-control"
                    onChange={handleType}
                    value={rtype}
                  >
                    <option value="all"> All</option>
                    <option value="success">Success</option>
                    <option value="danger">Danger</option>
                    <option value="warning">Warning</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-success" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <div className="row">
            {datalist.map((comment) => (
              <div className="col-sm-3 my-2" key={comment.id}>
                <div className="card">
                  <div
                    className={`card-header bg-${comment.type} own-warning own-success own-danger`}
                  >
                    <a
                      href={'https://t.me/' + comment.username}
                      className="user-name__link text-white text-decoration-none"
                    >
                      {comment.first_name}
                    </a>
                  </div>
                  <div className="card-body">
                    <p className="h6 text-left">Date: {comment.date}</p>
                    <p className="h6 text-left">Category: {comment.category}</p>
                    <Link to={`/complaints/${comment.id}`}>
                      <button
                        className={` btn btn-${comment.type} mt-1`}
                        type="submit"
                      >
                        Batafsil
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsFilter;
