import React, { useState } from 'react';

import axios from 'axios';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorsPass, setErrorsPass] = useState([]);
  const [errorsEmail, setErrorsEmail] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      axios.post('http://project/api/login', {
        headers : {
            'X-CSRF-TOKEN' : csrftoken
        },
        email : formData.email,
        password : formData.password,
      }).then(function (response) {
        localStorage.setItem('token', response.data.token);
        window.location.href = 'http://project/projectList';
      }).catch(function (error) {
        if (error.response.data.errors) {
            
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

        } else if (error.response.data.message) {
            setErrorsEmail([]);
            setErrorsPass([error.response.data.message]);
        }
      });
  };

  return (
    <div>
      <header>
        <div></div>
        <div className="site-title">Tuskpanel</div>
      </header>

      <div className="container">
        <h2>Авторизация</h2>
        <form id="log_form" onSubmit={handleSubmit}>
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
          <div className="login">
            <button type="submit">Авторизация</button>
          </div>
        </form>

        <div>
            <a href="http://project/register" className="linkToRegister">Нет аккаунта?</a>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;