import { useState, useEffect } from "react";
import axios from "axios";
const Login = () => {
  let [user, setUser] = useState();
  let [status, setStatus] = useState(0);
  let [view, setView] = useState(0);
  let checkLogin = (event) => {
    event.preventDefault();
    let obj = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log(obj);
    axios
      .get(`/userlogin/checklogin/${obj.username}/${obj.password}`)
      .then((res) => {
        setStatus(res.data.status);
        console.log(res.data.status);
        getUserDetails(obj.username);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserDetails = (username) => {
    axios
      .get(`/userlogin/${username}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      {status === 0 ? (
        <form onSubmit={checkLogin}>
          <h1>Login</h1>
          <input type='text' name='username' placeholder='Enter User Name' />
          <input type='password' name='password' placeholder='Enter Password' />
          <button>Login</button>
        </form>
      ) : (
        <div>
          <ul>
            <li>
              <a class='active' href='/'>
                Home
              </a>
            </li>
            <li
              onClick={() => {
                console.log("clicked");
                setView(1);
              }}
            >
              <a href='#sld'>View Details</a>
            </li>
            <li>
              <a href='#contact'>Contact</a>
            </li>
            <li>
              <a href='#about'>About</a>
            </li>
          </ul>
        </div>
      )}
      {view === 1 ? (
        <div>
          <h1>User Details</h1>
          {user.map((val) => {
            return (
              <div>
                <p>Username: {val.username}</p>
                <p>Password:{val.password}</p>
                <p>Date of Creation: {val.date_of_creation}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Login;
