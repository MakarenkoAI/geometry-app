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
        <h1 className="intro-title">Добро пожаловать в наше приложение!</h1>
        <p className="intro-info">
          Это приложение поможет вам в учебе, предоставляя полезные материалы и инструменты для школьников.
        </p>
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
            Перейти к редактору
          </Link>
        </form>
        <div className='intro-skip-button'> <Link to="/editor" className="intro-skip-button">Пропустить</Link> </div>
      </div>
    </div>
  );
}

export default Intro;