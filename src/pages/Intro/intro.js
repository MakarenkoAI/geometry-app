import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './intro.css';
import { createUserAgent } from '../../api/sc/agents/createUserAgent';

function Intro() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const handleLoginSuccess = (userName) => {
    setName(userName);
  };

  const isFormValid = name.trim() !== '' && grade.trim() !== '';
  const handleMessage = async () => {
    if (isFormValid){
      await createUserAgent(name, grade);
    }
    else {
      console.log("Form is not valid");
    }
  };

  return (
    <div className='intro-background'>
      <div className="intro-container">
        <div className="intro-title">Авторизация</div>
        <form className="intro-form" onSubmit={(e) => e.preventDefault()}>
          <div className="intro-inputGroup">
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="intro-inputGroup">
            <label htmlFor="grade">Класс:</label>
            <input
              type="text"
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </div>
          <Link
            to="/editor"
            className={`intro-button ${isFormValid ? '' : 'disabled'}`}
            onClick={handleMessage}>
            Далее
          </Link>
          <Link to="/editor" className="intro-button">Пропустить</Link>
          <Link to="/" className="intro-button">Назад</Link>
          <span className='intro-google-login'>
            <GoogleLogin
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse?.credential);
                console.log(decoded);
                handleLoginSuccess(decoded.given_name);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </span>
        </form>
      </div>
    </div>
  );
}

export default Intro;