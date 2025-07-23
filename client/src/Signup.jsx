import React, { useState } from "react";
import { Link } from "react-router-dom";
import InstaMainImg from './assets/images/instagram-web-lox-image.png';
import instaLogo from './assets/images/insta.jpg';

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    userName: ""
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://instaclone-dj3x.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          userName: formData.userName
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      setSuccessMsg("Signup successful! Please login.");
      setError("");
      setFormData({ email: "", password: "", fullName: "", userName: "" });
    } catch (err) {
      setError(err.message);
      setSuccessMsg("");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          <img className='m-20 size-9/12' src={InstaMainImg} alt="Instagram preview" />
        </div>
        <div className="w-1/2 pl-20">
          <div className='w-90'>
            <div className='instaImage pt-28'>
              <img src={instaLogo} alt="Instagram Logo" />
              <p className="text-center">Sign up to see photos and videos from your friends.</p>
            </div>

            <div className='grid grid-cols-1 items-center'>
              <input
                type='text'
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='block h-10 w-full mt-10 rounded-lg bg-gray-50 px-3 sm:text-sm outline outline-gray-950/15 focus:outline-gray-950'
                placeholder='Mobile Number or Email'
              />

              <input
                type='password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                className='block h-10 w-full mt-5 rounded-lg bg-gray-50 px-3 sm:text-sm outline outline-gray-950/15 focus:outline-gray-950'
                placeholder='Password'
              />

              <input
                type='text'
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className='block h-10 w-full mt-5 rounded-lg bg-gray-50 px-3 sm:text-sm outline outline-gray-950/15 focus:outline-gray-950'
                placeholder='Full Name'
              />

              <input
                type='text'
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className='block h-10 w-full mt-5 rounded-lg bg-gray-50 px-3 sm:text-sm outline outline-gray-950/15 focus:outline-gray-950'
                placeholder='Username'
              />

              <button
                type='button'
                className='w-full text-white rounded-lg bg-blue-500 mt-8 p-2 cursor-pointer'
                onClick={handleSignUp}
              >
                Sign up
              </button>

              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
              {successMsg && <p className="text-green-600 text-sm mt-3">{successMsg}</p>}
            </div>
            <div className="mt-4 w-full text-center">
              <p>Have an account? <Link to="/login" className="text-blue-500 font-medium">Log in</Link> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
