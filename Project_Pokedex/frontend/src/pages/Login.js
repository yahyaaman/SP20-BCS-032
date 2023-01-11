import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import banner from "../images/banner.jpg";
import login_banner from "../images/login-banner.webp";
import axios from "../axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();

  let emailEvent = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  let passwordEvent = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  async function userLogin() {
    const res = await axios.post("/user/login", { email, password });
    console.log(res);

    const data = await res.data;
    console.log(data);

    return data;
  }
  const submitEvent = () => {
    userLogin()
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => dispatch(authActions.login()))
      .then(() => naviagte("/"));
  };

  const id = localStorage.getItem("userID");
  console.log(id);

  return (
    <div className="login">
      <div className="left-section">
        <div className="login-form">
          <div className="title_desc">
            <h1 className="title">Log In</h1>

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
            <div className="remeber_forgot">
              <div className="remember">
                {/* <input type="checkbox" /> <p>Remember Me</p> */}
              </div>
              {/* <a href="#">Forgot Password</a> */}
            </div>
            <button className="sign-in" onClick={submitEvent}>
              Sign in
            </button>

            <p className="sign-up">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="right-section">
        <img src={login_banner} alt="" />
      </div>
    </div>
  );
};

export default Login;
