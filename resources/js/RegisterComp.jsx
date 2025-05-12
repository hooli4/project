import React, { useState } from 'react';

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

    alert(JSON.stringify(formData));
      axios.post('http://project/api/register', {
        name : formData.name,
        email : formData.email,
        password : formData.password,
        c_password: formData.c_password,
      }).then(function (response) {
        window.location.href = 'http://project/register/confirm-email';
      }).catch(function (error) {
        if (error.response) {
            console.log(error);
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
      <header>
        <div></div>
        <div className="site-title">Tuskpanel</div>
      </header>

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

      </div>
    </div>
  );
}

export default RegistrationPage;