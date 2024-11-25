import { Link } from 'react-router-dom';
import logo from './geometrycolor.png';
import './home.css';


function Home() {
  return (
    <Link to="/intro" className='default'>
      <div id='home'>
        <div id="column-div">
          <img src={logo} className="Home-logo" alt="logo" />
        </div>
        <div id="column-div">
          <div className='header'>
            LERNAN.GEOMETRY
          </div>
          <div className='advice'>
            Обучающая система по геометрии<br></br>
            Бесплатный ресурс для образовательных целей
          </div>
          <div className='advice'>
            Нажмите, чтобы начать
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Home;
