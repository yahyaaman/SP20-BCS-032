import React, { useEffect, useState } from "react";
import "../Styles/Signup.css";
import signup_banner from "../images/signup_banner.webp";
import axios from "../axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();

  let userEvent = (e) => {
    setUser(e.target.value);
    console.log(user);
  };
  let emailEvent = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  let passwordEvent = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const submitSignupEvent = (e) => {
    e.preventDefault();
    userSignup();
  };

  async function userSignup() {
    const res = await axios.post("/user/signup", { user, email, password });
    console.log(res);
  }

  return (
    <div className="login">
      <div className="left-section">
        <div className="login-form">
          <div className="logo"></div>
          <div className="title_desc">
            <h1 className="title">Signup</h1>
            <div className="input">
              <p>Username</p>
              <input
                type="text"
                placeholder="Enter your username"
                onChange={userEvent}
              />
            </div>
            <div className="input">
              <p>Email</p>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={emailEvent}
              />
            </div>
            <div className="input">
              <p>Password</p>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={passwordEvent}
              />
            </div>

            <button className="signup-button" onClick={submitSignupEvent}>
              Sign up
            </button>

            <p className="sign-up">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="signup-right-section">
        <img src={signup_banner} width="700px" alt="" />
      </div>
    </div>
  );
};

export default Signup;
