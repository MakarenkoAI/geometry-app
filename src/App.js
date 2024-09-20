import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Editor from './pages/editor'; 

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Главная страница */}
        <Route path="/editor" element={<Editor />} />  {/* Редактор */}
      </Routes>
    </Router>
  );
};

export default App;
