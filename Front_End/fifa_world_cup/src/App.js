//import logo from './logo.svg';
import './App.css';
import React , {useEffect, useState} from 'react';
import {BrowserRouter as Router,Routes, Route , createContext} from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import MatchesPage from './components/MatchesPage';
import MatchPage from './components/MatchPage';
import ProfilePage from './components/ProfilePage';

//import NavBar from './components/NavBar';

export const User = React.createContext();
function App() {
  return (
    <>
    {/* <NavBar/> */}
    <User.Provider value={{ 
      loggedIn : useState(localStorage.getItem("loggedIn")? localStorage.getItem("loggedIn") : false),
      user : useState(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : {}),
      token : useState(localStorage.getItem("token")? localStorage.getItem("token")  : ""),
    }}>
    <Router>
      <Routes> 
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/matches" element={<MatchesPage/>} />
          <Route path="/matches/:matchId" element={<MatchPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router> 
    </User.Provider>
    </>

  );
}
export default App;
