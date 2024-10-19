import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Editor from './pages/Editor/editor';
import Chat from './pages/Chat/chat';
import Intro from './pages/Intro/intro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Главная страница */}
        <Route path="/editor" element={<Editor />} />  {/* Редактор */}
        <Route path="/chat" element={<Chat />} />  {/* Чат */}
        <Route path="/intro" element={<Intro />} />  {/* Окно знакомства с пользователем */}
      </Routes>
    </Router>
  );
};

export default App;
