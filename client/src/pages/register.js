import React, { useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const [password, setPassword] = useState("");
  const [userId, SetUserId] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`https://my-school-backend.onrender.com/api/v1/auth/register`, {
        password,
        userId,
        answer,
      });
      if (data?.success) {
        navigate("/auth/login");
        setTimeout(() => {
          toast.success(data.message);
        }, 100)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="grid align__item margin">
        <div className="register">
          <svg xmlns="http://www.w3.org/2000/svg" className="site__logo" width={56} height={84} viewBox="77.7 214.9 274.7 412">
            <defs>
              <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#8ceabb" />
                <stop offset="100%" stopColor="#378f7b" />
              </linearGradient>
            </defs>
            <path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z" />
          </svg>
          <h2 className="heading">Sign Up</h2>
          <form action method="post" className="form register__form" onSubmit={submitHandle}>
            <div className="form__field">
              <input
                required='true'
                type="text"
                placeholder="info@mailaddress.com"
                className="form__input register__input register__input--email"
                onChange={(e) => {
                  SetUserId(e.target.value);
                }}
              />
            </div>
            <div className="form__field">
              <input
                required='true'
                type="password"
                placeholder="••••••••••••"
                className="form__input register__input register__input--password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form__field">
              <input
                required='true'
                type="text"
                placeholder="Last name of Your Father"
                className="form__input register__input register__input--password"
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
            </div>
            <div className="form__field">
              <input type="submit" defaultValue="Sign Up" className="form__submit register__submit" />
            </div>
          </form>
          <p>
            Already have an account?{" "}
            <Link to={"/auth/login"} className="link register__login-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
