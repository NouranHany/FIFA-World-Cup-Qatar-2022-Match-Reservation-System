//import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
//import NavBar from './components/NavBar';

function App() {
  return (
    <>
    {/* <NavBar/> */}
    <Router>
      <Routes> 
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router> 
    </>
  );
}

export default App;
