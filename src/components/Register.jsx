import firebase from "../config/Firebase";
import "firebase/auth";
import { useState } from "react";
import { useHistory } from "react-router";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conf, setConf] = useState();
  const [error, setError] = useState();
  let history = useHistory();

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnchangePass = (e) => {
    setPassword(e.target.value);
  };
  const handleOnchangeConf = (e) => {
    setConf(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    let emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailRegex.test(email)) {
      if (password.length === conf.length) {
        if (password === conf) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
              alert("successful sign up")
              setTimeout(() => {
                history.push("/signin");
              }, 1000);
            })
            .catch((error) => setError(error.message));
        } else {
          setError("the passwords doesn't match");
        }
      } else {
        setError("the passwords doesn't match");
      }
    } else {
      setError("Check your email, seems like you ate some letters");
    }

    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <div className="form-container">
      <div className="container-r">
        <div className="icon">
          <h1>Sign-up</h1>
          <h4>Movies</h4>
          <i className="fas fa-ticket-alt fa-10x"></i>
        </div>
        <div className="cont-r">
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
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
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
            <div className="form-group">
              <label htmlFor="passConfId">Confirm Password</label>
              <input
                type="password"
                id="passConfId"
                className="form-control"
                placeholder="Confirm Password"
                onChange={handleOnchangeConf}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
