import {useState} from 'react';

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleOnchangeEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    const handleOnchangePass = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);

        

    }

  return (
    <div className="form-container">
      <div className="container-r">
        <div className="icon">
        <h1>Sign-in</h1><h4>Movies</h4>
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
          <button type="submit" class="btn btn-success">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
