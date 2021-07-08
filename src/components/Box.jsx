import { useState, useEffect, useContext } from "react";
import languagesContext from "../context/languages/laguagesContext";
import Card from "./Card";
import axios from "axios";

const Box = () => {

  let [state, setState] = useState([]);
  let [order, setOrder] = useState();

  const context = useContext(languagesContext);
  const { changeLanguage, language } = context;


  const handleOnClickHig = (e) => {
    setState(
      state = state.sort((a, b) => {
        return b.popularity - a.popularity;
      })
    );
    setOrder("low");
    console.log(state)
  };

  const handleOnClickLow = (e) => {
    setState(
      state = state.sort((a, b) => {
        return a.popularity - b.popularity;
      })
    );
    setOrder("hig");
  };

  useEffect(() => {
    console.log(state);
  }, [order]);

  useEffect(() => {
    let url = "";
    if (language) {
      url =  "https://api.themoviedb.org/3/movie/popular?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US&page=1";
    } else {
      url =  "https://api.themoviedb.org/3/movie/popular?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=es-ES&page=1";
    }

    console.log(url);

    axios
      .get(
        url
      )
      .then((res) => {
        setState(res.data.results);
      })
      .catch((error) => console.log(error));

    console.log(state);
  }, [language]);

  

  const handleOnclickLan = (e) => {
    e.preventDefault();
    changeLanguage();
  };



  return (
    <div className="box-container">
      <div className="tools">
        <h6>Sort by popularity</h6>
        <div className="buttons">
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
              className={language ? "fas fa-toggle-on" : "fas fa-toggle-off"}
            ></i>
          </button>
          <span>En</span>
        </div>
        <div className="language"></div>
      </div>
      <div className="container">
        {state.map((movie, index) => (
          <Card key={index}  movie={movie}></Card>
        ))}
      </div>
    </div>
  );
};

export default Box;
