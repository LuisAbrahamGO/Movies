import { useState, useContext } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/auth";
import userContext from "../context/user/userContext";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  let history = useHistory();

  const contextUser = useContext(userContext);
  const { loginUser } = contextUser;

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnchangePass = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();

    googleSignInPopup(provider);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setTimeout(() => {
          loginUser(res.user.email);
          history.push("/");
        }, 1000);
      })
      .catch((error) => {
        setError(error.code);

        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  function googleSignInPopup(provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */

        let user = result.user;
        setTimeout(() => {
          loginUser(user.email);
          history.push("/");
        }, 1000);
      })
      .catch((error) => {
        let errorCode = error.code;

        setError(errorCode);

        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }

  return (
    <div className="form-container">
      <div className="container-r">
        <div className="icon">
          <h1>Sign-in</h1>
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
            <button onClick={handleGoogle} className="google-btn">
              <i className="fab fa-google"></i>
              Sign-in whit Google
            </button>
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
