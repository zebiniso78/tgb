import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import content from '../../Localization/Content';
import { LanguageContext } from '../../Context/Language';

import Doc from '../../Assets/Images/Login/document.png';
import avatar from '../../Assets/Images/Login/user.png';
import './CommentsFilter.css';
const avatar_color = {
  success: '#00ff00',
  warning: '#ffff00',
  danger: '#ff0000',
};

function CommentsFilter() {
  const { language } = React.useContext(LanguageContext);
  const type_text = {
    success: content[language].t_success,
    warning: content[language].t_warning,
    danger: content[language].t_danger,
  };
  const [datalist, setDatalist] = useState([]);
  const [filtrcat, setFiltrcat] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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

  const [related, setRelated] = useState([]);

  // Form inputs
  const [fromdate, setFromdate] = useState('');
  const [todate, setTodate] = useState('');
  const [category, setCategory] = useState('');
  const [rtype, setRtype] = useState('');
  const [activeli, setActiveli] = useState(0);
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
        const data = response.data;
        setDatalist(data);
      })
      .catch(function (error) {
        if (error.response.status) {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
        }
      });
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
        const data = response.data;
        setFiltrcat(data);
      })
      .catch(function (error) {
        if (error.response.status) {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
        }
      });
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
        setOpenModal(false);
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
    setActiveli(userID);
    axios({
      method: 'get',
      url: 'http://192.168.43.165:1122/api/complain/' + userID,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        const data = response.data;
        const chatID = data.complain.chat_id;
        setComplain(data);

        axios({
          method: 'get',
          url: 'http://192.168.43.165:1122/api/related/' + chatID,
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': localStorage.getItem('token'),
          },
        })
          .then(function (response) {
            const allComplain = response.data;
            setRelated(allComplain);
          })
          .catch(function (error) {
            if (error.response.status) {
              if (error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
              }
            }
          });
      })
      .catch(function (error) {
        if (error.response.status) {
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
        <div className="row ovf complain-left col-3 my-1">
          <button
            type="button"
            className="filter__button btn btn-success"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {content[language].filter}
          </button>

          <ul className="complain__list">
            {datalist
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((comment) => (
                <li
                  id={comment.id}
                  className={
                    comment.id === activeli
                      ? 'complain__item bg-white d-flex align-center rounded py-2 mb-3 active-li'
                      : 'complain__item bg-white d-flex align-center rounded py-2 mb-3'
                  }
                  key={comment.id}
                  onClick={handleUser}
                >
                  <div className="user__avatar-wrapper me-2">
                    <img src={avatar} alt="" width={45} height={45} />
                  </div>
                  <div className="complain__item-wrapper">
                    <a
                      href={'https://t.me/' + comment.username}
                      className={`user-name__link text-black text-decoration-none`}
                    >
                      {comment.first_name}
                    </a>
                    <span className="complain__item-date">
                      {comment.date.split(' ', 1)}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-6 complain-center">
          {complain.complain.first_name.length > 0 ? (
            <div className="complain-center-top">
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
          ) : (
            ''
          )}
          <div className="complain-center-body">
            {complain.complain.complain_date.map((row) =>
              row.key === 'text' ? (
                <div
                  className="complain__text-wrapper d-flex m-0 my-3"
                  key={row.id}
                >
                  <p className="complain__text h6">{row.value}</p>
                </div>
              ) : row.key === 'photo' ? (
                <div
                  className="complain__image-wrapper d-block my-3 "
                  key={row.id}
                >
                  <img
                    className="complain__image rounded float-left"
                    src={`http://192.168.43.165:1122/${row.value}`}
                    alt="Sent"
                    width={200}
                    height={200}
                  />
                </div>
              ) : row.key === 'voice' ? (
                <div
                  className="complain__audio-wrapper my-3 rounded float-left"
                  key={row.id}
                >
                  <audio
                    controls
                    className="complain__audio rounded float-left p-1"
                  >
                    <source
                      src={`http://192.168.43.165:1122/${row.value}`}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              ) : row.key === 'document' ? (
                <a
                  className="complain__doc-link my-3 rounded float-left"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={row.id}
                  href={`http://192.168.43.165:1122/${row.value}`}
                  download
                >
                  <img
                    className="complain__doc-image"
                    src={Doc}
                    alt="Document"
                    width="40"
                    height="40"
                  />
                  <p className="complain__doc-name">
                    {row.value.split('/', 4).reverse().join().split(',', 1)}
                  </p>
                </a>
              ) : (
                ''
              )
            )}
          </div>
        </div>

        <div className="complain-right">
          {complain.complain.first_name.length > 0 ? (
            <div className="col-3 complain-right-top">
              <div>
                <h2 className="complain__name-right">
                  {complain.complain.first_name}
                </h2>
              </div>
              <p className="full-info">{content[language].full_info}</p>
              <p className="complain__date">
                {content[language].date}: {complain.complain.created_time}
              </p>
              <p className="complain__type">
                {content[language].type}:{' '}
                <span class={`badge bg-${complain.complain.type}`}>
                  {' '}
                  {type_text[complain.complain.type]}
                </span>
              </p>
              <p className="complain__category">
                {' '}
                {content[language].category}: {complain.complain.category}{' '}
              </p>
            </div>
          ) : (
            ''
          )}

          <div className="complain-right-body">
            <ul className="complain__list-related">
              {related.map((rcomment) => (
                <li
                  id={rcomment.id}
                  className="complain__item-related bg-white d-flex align-center rounded py-2 mb-3"
                  key={rcomment.id}
                  onClick={handleUser}
                >
                  <div className="complain__item-related-wrapper">
                    <div className="d-flex justify-content-between">
                      <a
                        href={'https://t.me/' + rcomment.username}
                        className={`user-name__link text-${rcomment.type} text-decoration-none`}
                      >
                        {rcomment.first_name}
                      </a>
                    </div>
                    <p className="h6">
                      {content[language].category}: {rcomment.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {openModal ? (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                className="btn-danger close__modal"
                onClick={() => setOpenModal(false)}
              >
                X
              </button>
            </div>
            <div className="body">
              <form className="form__wrapper" onSubmit={handleSubmit}>
                <div className="row px-2 mb-2">
                  <label className="h6 color-dark m-0 p-0 mb-1" htmlFor="date">
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
                  <label className="h6 color-dark m-0 p-0 mb-1" htmlFor="date">
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
                  <label
                    className="h6 color-dark m-0 p-0 mb-1"
                    htmlFor="category"
                  >
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
                  <label className="h6 color-dark m-0 p-0 mb-1" htmlFor="type">
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
                    <option value="success">
                      {' '}
                      {content[language].t_success}
                    </option>
                    <option value="warning">
                      {content[language].t_warning}
                    </option>
                    <option value="danger">{content[language].t_danger}</option>
                  </select>
                  <div className="btn__wrapper">
                    <button
                      className="send__button w-25 btn-success mt-3 px-2 py-1"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {content[language].btn_send}
                    </button>
                    <button
                      className="close__button w-25 btn-danger mt-3 px-2 py-1"
                      onClick={() => setOpenModal(false)}
                    >
                      {content[language].cancel}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default CommentsFilter;
