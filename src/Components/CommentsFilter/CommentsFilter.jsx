import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import content from '../../Localization/Content';
import { LanguageContext } from '../../Context/Language';

import Identicon from 'identicon.js';

import './CommentsFilter.css';

function CommentsFilter() {
  const { language } = React.useContext(LanguageContext);

  const [datalist, setDatalist] = useState([]);
  const [filtrcat, setFiltrcat] = useState([]);

  const [complain, setComplain] = useState({
    complain: {
      category: '',
      chat_id: null,
      complain_date: [],
      created_time: '',
      first_name: '',
      id: null,
      type: '',
      username: '',
    },
    kafedra_name: '',
    teacher_name: '',
  });

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
        console.log(data);
        setDatalist(data);
      })
      .catch(function (error) {
        console.log(error);
        if (error.length > 0) {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        if (error.length > 0) {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function handleUser(event) {
    event.preventDefault();
    let userID = event.currentTarget.id;
    console.log(userID);

    axios({
      method: 'get',
      url: 'http://192.168.43.165:1122/api/complain/' + userID,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        //console.log(response);
        const data = response.data;
        console.log(data);
        setComplain(data);
      })
      .catch(function (error) {
        if (error.length > 0) {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return (
    <>
      <div className="container-fluid">
        {/* <div
        className="col-3 border border-0 border-right m-0 p-0"
        id="user__list"
      >
        <form className="form__wrapper" onSubmit={handleSubmit}>
          <div className="row px-2 mb-2">
            <label className="h6 color-dark m-0 p-0 mb-1" for="date">
              {content[language].date_from}
            </label>
            <input
              type="date"
              className="form-control"
              value={fromdate}
              onChange={handleDate}
            />
          </div>

          <div className="row px-2 mb-2">
            <label className="h6 color-dark m-0 p-0 mb-1" for="date">
              {content[language].date_to}
            </label>
            <input
              type="date"
              className="form-control"
              value={todate}
              onChange={handleToDate}
            />
          </div>

          <div className="row px-2 mb-2">
            <label className="h6 color-dark m-0 p-0 mb-1" for="category">
              {content[language].category}
            </label>
            <select
              className="form-control"
              name="category"
              id="category"
              onChange={handleCategory}
              value={category}
            >
              <option value="all">{content[language].t_all}</option>

              {filtrcat.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="row px-2 mb-2">
            <label className="h6 color-dark m-0 p-0 mb-1" for="type">
              {content[language].type}
            </label>
            <select
              className="form-control px-2"
              name="type"
              id="type"
              onChange={handleType}
              value={rtype}
            >
              <option value="all">{content[language].t_all}</option>
              <option value="success"> {content[language].t_success}</option>
              <option value="warning">{content[language].t_warning}</option>
              <option value="danger">{content[language].t_danger}</option>
            </select>

            <button className="btn-success mt-3 px-2 py-1" type="submit">
              {content[language].btn_send}
            </button>
          </div>

          {/* <h3 className="h4 px-1 my-3">Complain lists</h3> *
        </form> */}

        <div className="row ovf col-3 my-1">
          <ul className="complain__list">
            {datalist.map((comment) => (
              <li
                id={comment.id}
                className="complain__item bg-white d-flex align-center rounded py-2 mb-3"
                key={comment.id}
                onClick={handleUser}
              >
                <div className="user__avatar-wrapper">
                  <img
                    className="complain__avatar me-2"
                    alt="Icon"
                    width="30"
                    height="30"
                    src={`data:image/png;base64,${new Identicon(
                      comment.avatar,
                      30
                    ).toString()}`}
                  />
                </div>
                <div className="complain__item-wrapper">
                  <div className="d-flex justify-content-between">
                    <a
                      href={'https://t.me/' + comment.username}
                      className={`user-name__link text-${comment.type} text-decoration-none`}
                    >
                      {comment.first_name}
                    </a>
                    <span className="h6 ms-4">
                      {comment.date.split(' ', 1)}
                    </span>
                  </div>
                  <p className="h6">
                    {content[language].category}: {comment.category}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-6 complain-center border border-1">
          <div className="complain-center-top">
            <div>
              <h3 className="user__complain-name">
                {complain.complain.first_name}
              </h3>
              <a
                href={'https://t.me/' + complain.complain.username}
                className="user__complain-username"
              >
                {complain.complain.username}
              </a>
            </div>
            <div>
              <p className={`complain-type color-${complain.complain.type}`}>
                {complain.complain.type}
              </p>
              <span className="complain-date">{complain.complain.date}</span>
            </div>
          </div>
        </div>
        {/* <div className="comments__wrapper card my-5">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <div className="form-group">
                  <label for="date">{content[language].date_from}</label>
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
                  <label for="t_date">{content[language].date_to}</label>
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
                  <label for="category">{content[language].category}</label>
                  <select
                    name="category"
                    id="category"
                    className="form-control"
                    onChange={handleCategory}
                    value={category}
                  >
                    <option value="all">{content[language].t_all}</option>
                    {filtrcat.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <label for="type">{content[language].type}</label>
                  <select
                    name="type"
                    id="type"
                    className="form-control"
                    onChange={handleType}
                    value={rtype}
                  >
                    <option value="all">{content[language].t_all}</option>
                    <option value="success">
                      {content[language].t_success}
                    </option>
                    <option value="warning">
                      {content[language].t_warning}
                    </option>
                    <option value="danger">{content[language].t_danger}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-success px-4 py-2 d-flex" type="submit">
              {content[language].btn_send}
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
                    <p className="h6 text-left">
                      {content[language].date}: {comment.date}
                    </p>
                    <p className="h6 text-left">
                      {content[language].category}: {comment.category}
                    </p>
                    <Link to={`/complain/${comment.id}`}>
                      <button
                        className={` btn btn-${comment.type} mt-1`}
                        type="submit"
                      >
                        {content[language].btn_more}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
}

export default CommentsFilter;
