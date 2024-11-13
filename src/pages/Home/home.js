import { Link } from 'react-router-dom';
import logo from './home-logo.png';
import './home.css';


function Home() {
  return (
    <div className="home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          <code>Геометрия</code>
        </p>
        <Link to="/intro" className="Home-link">
          Начать знакомство
        </Link>
      </header>
    </div>
  );
}

export default Home;
