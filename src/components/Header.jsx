import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
         <Link to="/" ><h1 className="navbar-brand"><i className="fas fa-ticket-alt"></i>Movies</h1></Link> 
        </div>
      </nav>
    </div>
  );
};

export default Header;
