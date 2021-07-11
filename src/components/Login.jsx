import { useState, useContext } from "react";
import { useHistory } from "react-router";
import firebase from "../config/Firebase";
import userContext from "../context/user/userContext";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  let history = useHistory();

  const contextUser = useContext(userContext);
  const { loginUser } = contextUser;

  const handleOnchangeEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleOnchangePass = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setTimeout(() => {
          loginUser(res.user.email);
          history.push("/");
        }, 2000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-container">
      <div className="container-r">
        <div className="icon">
          <h1>Sign-in</h1>
          <h4>Movies</h4>
          <i className="fas fa-ticket-alt fa-10x"></i>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="emailId">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailId"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleOnchangeEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passId">Password</label>
            <input
              type="password"
              id="passId"
              className="form-control"
              placeholder="Password"
              onChange={handleOnchangePass}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
