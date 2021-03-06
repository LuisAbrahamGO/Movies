import { Fragment, useContext, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import sortContext from "../context/sort/sortContext";
import languagesContext from "../context/languages/laguagesContext";
import userContext from "../context/user/userContext";
import firebase from "firebase/app";
import "firebase/auth";

const Header = () => {
  const nav = useRef();
  let history = useHistory();
  const contextUser = useContext(userContext);
  const { logoutUser, user } = contextUser;

  const contextLan = useContext(languagesContext);
  const { changeLanguage, language } = contextLan;

  const contextSort = useContext(sortContext);
  const { changeSortHig, changeSortLow } = contextSort;


  const handleOnClickHig = (e) => {
    
    changeSortHig();
  };

  const handleOnClickLow = (e) => {
    
    changeSortLow();
  };

  const handleOnclickLan = (e) => {
   
    changeLanguage();
  };

  const handleLogout = () => {

    firebase.auth().signOut().then(() => {
      setTimeout(() => {
        logoutUser();
        history.push('/signin')
      }, 1000);
    }).catch((error) => {
      console.log(error);
    });

  }

  useEffect(() => {
  }, [user])

  const handleBarsClick = () => {
    nav.current.classList.toggle("points-hide");
    nav.current.classList.toggle("points");
  };

  return (
    <div className="header">
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link to="/">
            <h1 className="navbar-brand">
              <i className="fas fa-ticket-alt"></i>Movies
            </h1>
          </Link>
          <div className="bars">
            <button onClick={handleBarsClick} className="bars-btn">
              <i className="fas fa-bars fa-2x"></i>
            </button>
            <div ref={nav} className="points-hide">
              <div className="tools">
                <div className="sort-btns">
                  <p>{language ? "Sort by popularity" : "Ordernar por pop"}</p>
                  <button onClick={handleOnClickHig}>
                    <i className="fas fa-arrow-circle-up"></i>
                  </button>
                  <button onClick={handleOnClickLow}>
                    <i className="fas fa-arrow-circle-down"></i>
                  </button>
                </div>
                <div className="lan-btn">
                  <span>Es</span>
                  <button onClick={handleOnclickLan}>
                    <i
                      className={
                        language ? "fas fa-toggle-on" : "fas fa-toggle-off"
                      }
                    ></i>
                  </button>
                  <span>En</span>
                </div>
              </div>
              <div className="log-options">
                {!user ? (
                  <Fragment>
                    <Link to="/register">
                      <button>{language ? "Sign-up" : "Registrarse"}</button>
                    </Link>
                    <Link to="/signin">
                      <button>{language ? "Sign-in" : "Entrar"}</button>
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <p>{user}</p>
                    <button onClick={handleLogout}>{language ? "Sign-out" : "Salir"}</button>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="right-cont">
            <div className="tools">
              <div className="sort-btns">
                <p>{language ? "Sort by popularity" : "Ordernar por pop"}</p>
                <button onClick={handleOnClickHig}>
                  <i className="fas fa-arrow-circle-up"></i>
                </button>
                <button onClick={handleOnClickLow}>
                  <i className="fas fa-arrow-circle-down"></i>
                </button>
              </div>
              <div className="lan-btn">
                <span>Es</span>
                <button onClick={handleOnclickLan}>
                  <i
                    className={
                      language ? "fas fa-toggle-on" : "fas fa-toggle-off"
                    }
                  ></i>
                </button>
                <span>En</span>
              </div>
            </div>
            <div className="log-options">
              {!user ? (
                <Fragment>
                  <Link to="/register">
                    <button>{language ? "Sign-up" : "Registrarse"}</button>
                  </Link>
                  <Link to="/signin">
                    <button>{language ? "Sign-in" : "Entrar"}</button>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <p>{user}</p>
                  <button onClick={handleLogout}>{language ? "Sign-out" : "Salir"}</button>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
