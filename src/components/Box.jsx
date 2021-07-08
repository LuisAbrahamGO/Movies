import { useState, useEffect, Fragment } from "react";
import Card from "./Card";
import axios from "axios";

const Box = () => {
  const [state, setState] = useState([]);
  let [order, setOrder] = useState("hig");

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US&page=1"
      )
      .then((res) => {
        setState(res.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleOnClickHig = (e) => {
    setOrder("hig");
  };

  const handleOnClickLow = (e) => {
    setOrder("low");
  };

  useEffect(() => {

    if (order === "low") {
      setState(
        state.sort((a, b) => {
          return b.popularity - a.popularity;
        })
      );
    } else if (order === "hig") {
      setState(
        state.sort((a, b) => {
          return a.popularity - b.popularity;
        })
      );
    }

    console.log(state);
  }, [state, handleOnClickHig, handleOnClickLow]);

  return (
    <div className="box-container">
      <div className="dropdown">
        <h6>Popularity order</h6>
        <div className="buttons">
          <button onClick={handleOnClickHig}>
            <i className="fas fa-arrow-circle-up"></i>
          </button>
          <button onClick={handleOnClickLow}>
            <i className="fas fa-arrow-circle-down"></i>
          </button>
        </div>
      </div>
      <div className="container">
        {state.map((movie, index) => (
          <Card key={movie.id} movie={movie}></Card>
        ))}
      </div>
    </div>
  );
};

export default Box;
