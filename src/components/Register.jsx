import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conf, setConf] = useState();

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
          alert("Registrado con exito");
        }
      } else {
        console.log(password);
      }
    } else {
      console.log(email);
    }
  };

  return (
    <div className="form-container">
      <div className="container-r">
        <div className="icon">
          <h1>Sign-up</h1>
          <h4>Movies</h4>
          <i className="fas fa-ticket-alt fa-10x"></i>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div class="form-group">
            <label for="emailId">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailId"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleOnchangeEmail}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="passId">Password</label>
            <input
              type="password"
              id="passId"
              class="form-control"
              placeholder="Password"
              onChange={handleOnchangePass}
            />
          </div>
          <div class="form-group">
            <label for="passConfId">Confirm Password</label>
            <input
              type="password"
              id="passConfId"
              class="form-control"
              placeholder="Confirm Password"
              onChange={handleOnchangeConf}
            />
          </div>
          <button type="submit" class="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
