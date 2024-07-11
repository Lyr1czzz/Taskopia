import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Header from './components/Header';
import Home from './pages/Home';
import TimerPage from './pages/TimerPage'; // Импортируйте компонент TimerPage
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import UserTable from './pages/UserTable';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/timer" element={<TimerPage />} /> {/* Добавьте маршрут для таймера и секундомера */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;