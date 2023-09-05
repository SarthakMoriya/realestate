/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import classes from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux'
import { request } from "../../utils/fetchApi";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");
  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
      //better than creating 3 different states for each input
      //email:test@email.com ,...
    });
  };

  const notify = (message, type = "error") => {
    if (type == "success") toast.success(message);
    else toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //saving image only
      let filename = null;
      if (photo) {
        console.log(photo);
        const formData = new FormData();
        filename = crypto.randomUUID() + photo.name;
        formData.append("filename", filename);
        formData.append("image", photo);

        await request("/upload/image", "POST", {}, formData, true);
      } else {
        notify("Please add profile photo!");
        return;
      }

      const headers = {
        "Content-type": "application/json",
      };
      const data = await request("/auth/signup", "POST", headers, {
        ...state,
        photoUrl: filename,
      });
      console.log(data, data.message);
      if (data.message == "success") {
        notify("successfully registered", "success");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else if (data.message[0] == "E") {
        notify("Username already registered");
        console.log(data.message);
      } else {
        notify("Email already registered");
      }
    } catch (error) {
      console.log(error, error.message);
    }
  };
  return (
    <div className={classes.container}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        // draggable
        // pauseOnHover
        theme="dark"
      />
      <div className={classes.wrapper}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username..."
            onChange={(e) => {
              handleState(e);
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address..."
            onChange={(e) => {
              handleState(e);
            }}
          />

          <label htmlFor="photo">
            Upload Photo <AiOutlineFileImage />
          </label>
          <input
            type="file"
            id="photo"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
            style={{ display: "none" }}
          />

          <input
            type="password"
            placeholder="Password..."
            name="password"
            onChange={(e) => {
              handleState(e);
            }}
          />

          <button type="submit">Register</button>
          <p>
            Already have an account ? <Link to="/signin">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
