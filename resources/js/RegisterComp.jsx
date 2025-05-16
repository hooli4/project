import React, { useState } from 'react';

import bg from './background.jpg';
import logo from './logo.png';

import axios from 'axios';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
  });
  const [errorsName, setErrorsName] = useState([]);
  const [errorsPass, setErrorsPass] = useState([]);
  const [errorsEmail, setErrorsEmail] = useState([]);
  const [errorsCPass, setErrorsCPass] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      axios.post('http://project/api/register', {
        headers : {
            'X-CSRF-TOKEN' : csrftoken
        },
        name : formData.name,
        email : formData.email,
        password : formData.password,
        c_password: formData.c_password,
      }).then(function (response) {
        window.location.href = 'http://project/register/confirm-email';
      }).catch(function (error) {
        if (error.response) {
            if (error.response.data.errors.name) {
                const errorsName = Object.values(error.response.data.errors.name).flat();
                setErrorsName(errorsName);
            }

            else setErrorsName([]);

            if (error.response.data.errors.email) {
                const errorsEmail = Object.values(error.response.data.errors.email).flat();
                setErrorsEmail(errorsEmail);
            }

            else setErrorsEmail([]);

            if (error.response.data.errors.password) {
                const errorsPass = Object.values(error.response.data.errors.password).flat();
                setErrorsPass(errorsPass);
            }

            else setErrorsPass([]);

            if (error.response.data.errors.c_password) {
                const errorsCPass = Object.values(error.response.data.errors.c_password).flat();
                setErrorsCPass(errorsCPass);
            }

            else setErrorsCPass([]);

        } else {
            console.error('Ошибка: ', error.message);
        }
      });
  };

  return (
    <div>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '10px 20px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Лого" style={{ height: 40 }} />
          <div style={{ 
            fontWeight: 'bold', 
            fontSize: 20, 
            marginLeft: 15,
            color: 'black'
          }}>
            Tuskpanel
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ cursor: 'pointer', userSelect: 'none' }} id="languageDropdown">
            <div style={{ fontSize: 16, fontWeight: 500, color: 'black'}}>
              <b>Русский</b>
            </div>
            <div id="languageOptions">
              <div>English</div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ 
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div className="container">
        <h2>Регистрация</h2>
        <form id="reg_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="error-container">
          {errorsName.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
          <input
            type="email"
            placeholder="Почта"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="error-container">
          {errorsEmail.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="error-container">
          {errorsPass.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
            type="password"
            placeholder="Повторите пароль"
            name="c_password"
            value={formData.c_password}
            onChange={handleChange}
          />
          <div className="error-container">
          {errorsCPass.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
          </div>
          <div className="reg">
            <button type="submit">Регистрация</button>
          </div>
        </form>

        <div>
            <a href="http://project/login" className="linkToLogin">Уже есть аккаунт?</a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default RegistrationPage;