import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import ApplicationView from "./components/ApplicationView";
import { onLoginStatusChange, me } from "./modules/AuthManager";
import { Spinner } from 'reactstrap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  const updateUser = () => {
    me().then(setUserProfile);
  }

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
      <ApplicationView isLoggedIn={isLoggedIn} userProfile={userProfile} updateUser={updateUser} />
    </Router>
  );
}

export default App;