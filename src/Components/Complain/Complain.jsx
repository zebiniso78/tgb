import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Complain.css';

function Complain() {
  const { id } = useParams();
  const type_dict = {
    danger: 'Shikoyat',
    warning: 'Etiroz',
    success: 'Taklif',
  };
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

  //const [userAllComplain, setUserAllComplain] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://192.168.43.165:1122/api/complain/' + id,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        //console.log(response);
        const data = response.data;
        const chatID = data.complain.chat_id;

        setComplain(data);

        //console.log(data); //axios

        axios({
          method: 'get',
          url: 'http://192.168.43.165:1122/api/related/' + chatID,
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': localStorage.getItem('token'),
          },
        }).then(function (response) {
          console.log(response);
          const allComplain = response.data;
          console.log(allComplain.first_name);
          setRelated(allComplain);
        });
        // .catch(function (error) {
        //   if (error.response.status === 401) {
        //     localStorage.removeItem('token');
        //     navigate('/');
        //   }
        // });
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

  //console.log(complain.complain.complain_date);

  const d = complain.complain.complain_date;
  // const d_list = [];
  // console.log(d);

  // d.forEach((e) => d_list.push(<p>{e.value}</p>));

  // console.log(d_list);
  return (
    <>
      <div
        className="card mt-4 border border-3 border-success"
        id="complain__wrapper"
      >
        <div className="center">
          <div className="card-header col-9" id="complain__header-wrapper">
            <div className="row">
              <a
                href={'https://t.me/' + complain.complain.username}
                className="text-secondary text-decoration-none mb-2"
              >
                <p className="h5 text-left my-0" id="complain__text-username">
                  <span>{complain.complain.first_name}</span>
                </p>
              </a>
              <p
                className={`complain__text-type text-${complain.complain.type} h5 `}
              >
                {type_dict[complain.complain.type]}
              </p>
            </div>
          </div>
          <div className="card-body col-9" id="complain__body-wrapper">
            <div className="col">
              {d.map((row) =>
                row.key === 'text' ? (
                  <div className="complain__text-wrapper d-inline-block m-0 my-4 ">
                    <p className="complain__text h6">{row.value}</p>
                  </div>
                ) : row.key === 'photo' ? (
                  <div className="complain__image-wrapper w-25 d-block mb-4 ">
                    <img
                      className="complain__image rounded float-left"
                      src={`http://192.168.43.165:1122/${row.value}`}
                      alt="Sent"
                      width={200}
                      height={200}
                    />
                  </div>
                ) : row.key === 'voice' ? (
                  <div className="complain__audio-wrapper w-25 mb-4 rounded float-left">
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
                ) : (
                  ''
                )
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="row">
            <div className="col">
              {related.map((rel) => (
                <p>{rel.category}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Complain;
