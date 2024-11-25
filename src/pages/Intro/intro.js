import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './intro.css';

function Intro() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const isFormValid = name.trim() !== '' && grade.trim() !== '';

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
            onClick={(e) => !isFormValid && e.preventDefault()}>
            Далее
          </Link>
          <Link to="/editor" className="intro-button">Пропустить</Link>
          <Link to="/" className="intro-button">Назад</Link>
        </form>
      </div>
    </div>
  );
}

export default Intro;