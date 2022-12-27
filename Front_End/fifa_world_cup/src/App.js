//import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import MatchesPage from './components/MatchesPage';
import MatchPage from './components/MatchPage';
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
          <Route path="/matches" element={<MatchesPage/>} />
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/matches/:matchId" element={<MatchPage/>} />
      </Routes>
    </Router> 
    </>
  );
}

export default App;
