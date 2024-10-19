import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './intro.css';

function Intro() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  return (
    <div className="container">
      <h1 className="title">Добро пожаловать в наше приложение!</h1>
      <p className="info">
        Это приложение поможет вам в учебе, предоставляя полезные материалы и инструменты для школьников.
      </p>
      <form className="form">
        <div className="inputGroup">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="grade">Класс:</label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <Link to="/editor" className="button">
          Начать
        </Link>
      </form>
    </div>
  );
}

export default Intro;