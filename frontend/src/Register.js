import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {
  let navigate = useNavigate();
  let addUser = (event) => {
    event.preventDefault();
    let obj = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    console.log(obj);
    axios
      .post("/userlogin", obj)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className='container'>
      <h1>Category</h1>
      <form onSubmit={addUser}>
        <input type='text' name='username' placeholder='Enter User Name' />
        <input type='password' name='password' placeholder='Enter Password' />
        <button>Register</button>
      </form>
    </div>
  );
};
export default Register;
