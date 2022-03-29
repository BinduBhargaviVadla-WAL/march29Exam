import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to home page</h1>
      <Link to='/register' className='link'>
        Register
      </Link>

      <Link to='/login' className='link link-login'>
        Login
      </Link>
    </div>
  );
}
