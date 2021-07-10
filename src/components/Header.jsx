import { useContext } from "react";
import { Link } from "react-router-dom";
import sortContext from "../context/sort/sortContext";
import languagesContext from "../context/languages/laguagesContext";

const Header = () => {
  const contextLan = useContext(languagesContext);
  const { changeLanguage, language } = contextLan;

  const contextSort = useContext(sortContext);
  const { changeSortHig, changeSortLow } = contextSort;

  const handleOnClickHig = (e) => {
    e.preventDefault();
    changeSortHig();
  };

  const handleOnClickLow = (e) => {
    e.preventDefault();
    changeSortLow();
  };

  const handleOnclickLan = (e) => {
    e.preventDefault();
    changeLanguage();
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
          <div className="tools">
            <div className="sort-btns">
            <h6>{language ? "Sort by popularity" : "Ordernar por popularidad"}</h6>
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
            <div className="language"></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
