import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);

  const [data, setData] = useState({firstname: "", lastname: "",password: "", confirmPass: "", username: ""});

   const [confirmPass, setConfirmPass] = useState(true);

  // Reset Form
  const resetForm = () => {
    setData({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: "",
  });
    setConfirmPass(true);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>1001 FİLM</h1>
          <h5>Film görüşerinin birleştiği platform.</h5>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Kayıt Ol" : "Giriş Yap"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
              <div>
          <span
            style={{
              color: "red",
              fontSize: "15px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            * Şifreler aynı değil
          </span>
          <div>
              <span
                style={{
                  fontSize: "12px",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setIsSignUp((prev) => !prev); resetForm()
                
              }}
            >
              {isSignUp
                ? "Hesabınız varsa giriş yapın."
                : "Hesabınız yoksa kayıt olun."}
              </span>
              </div> 
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Yükleniyor..." : isSignUp ? "Kayıt Ol" : "Giriş Yap"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;