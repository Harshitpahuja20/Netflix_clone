import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fireBaseauth } from "../../Constants/Firebase-config";
import Netflix_bg from "../../Images/Netflix_bg.jpg";
import Header from "./Header";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const Navigate = useNavigate();
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const { email, password } = data;
      await signInWithEmailAndPassword(fireBaseauth, email, password);
      alert("Login Succesfully")
    } catch (error) {
      console.log(error);
      alert("Please check the email and password again")
    }
  };
  onAuthStateChanged(fireBaseauth, (currentUser) => {
    if (currentUser) Navigate("/");
  });
  return (
    <div className="front-page">
      <div className="shade"></div>
      <div className="background_image">
        <img src={Netflix_bg} alt="" />
      </div>
      <div className="content">
        <Header />
        <div className="login-form">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            onChange={onChange}
            value={data.email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={data.password}
          />
          <div className="button">
            <button type="button" onClick={handleSubmit}>
              Log In
            </button>
          </div>
          <p>
            Don't have a account ?{" "}
            <span onClick={() => Navigate("/signup")}> SignUp Here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
