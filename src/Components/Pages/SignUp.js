import React, { useState } from "react";
import Header from "./Header";
import Netflix_bg from "../../Images/Netflix_bg.jpg";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { fireBaseauth } from "../../Constants/Firebase-config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const Navigate = useNavigate();
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(fireBaseauth, email, password);
      alert("Account created Succesfully")
    } catch (error) {
      console.log(error);
      if(error.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        alert("Password should be at least 6 characters")
      }else if(error.message === "Firebase: Error (auth/email-already-in-use)."){
        alert("Email already in use.")
      }else if(error.message === "Error (auth/invalid-email)."){
        alert("Invalid Email Address")
      } else{
        alert("Email or password cannot be empty1")
      }
    }
  };
  onAuthStateChanged(fireBaseauth, (currentUser) => {
    if (currentUser) {
      Navigate("/login");
    }
  });
  return (
    <div className="front-page">
      <div className="shade"></div>
      <div className="background_image">
        <img src={Netflix_bg} alt="" />
      </div>
      <div className="content">
        <Header login />
        <div className="sign_up">
          <div className="text">
            <h1>Unlimited movies, TV shows and more.</h1>
            <p className="p1">Watch anywhere. Cancel anytime.</p>
            <p className="p2">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
          </div>
          <div signup_form>
            <div className={`inputs ${isSignup === true ? "gap" : ""}`}>
              <input
                type="email"
                placeholder="Email address"
                className="SignUp-input"
                name="email"
                onChange={onChange}
                value={data.email}
              />
              {isSignup === true ? (
                <input
                  type="password"
                  placeholder="Password"
                  className="SignUp-input"
                  name="password"
                  onChange={onChange}
                  value={data.password}
                />
              ) : (
                <button className="btnn" onClick={() => setIsSignup(true)}>
                  Get Started
                </button>
              )}
            </div>
            <div className="signup-btn">
              <button
                className={`btnn border ${
                  isSignup === true ? "d-block" : "d-none"
                }`}
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
