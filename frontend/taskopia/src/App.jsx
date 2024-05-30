import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Header from './components/Header';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;