import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [name, setName] = useState({
    username: "",
    password: ""
  });
  const changeHandler = event => {
    event.preventDefault();
    setName({ ...name, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
  };
  const login = e => {
    e.preventDefault();
    axios
    .post("http://localhost:5000/api/login", name)
    .then(res => {
        console.log(res)
      localStorage.setItem("token", res.data.payload);
    })
    .catch(err => console.log(err.response));
      props.history.push("/protected");
  };
  return (
    <div className='loginPage'>
        <form className='loginForm' onSubmit={event => handleSubmit(event)} onKeyDown={props.closeLoginHandler2} tabIndex="0">
            <h1>Login</h1>
            <p>Username</p>
            <input type="text" name="username" onChange={changeHandler} value={name.username} />
            <p>Password</p>
            <input type="password" name="password" onChange={changeHandler} value={name.password} />
            <button onClick={login}>Login!</button>
        </form>
    </div>
);
};

export default withRouter(Login);
