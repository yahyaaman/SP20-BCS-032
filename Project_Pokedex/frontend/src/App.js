import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
// import Card from "./components/Card";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import MyPokemons from "./pages/MyPokemons";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:pokemonId" element={<Details />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypokemons" element={<MyPokemons />} />
        <Route path="*" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
