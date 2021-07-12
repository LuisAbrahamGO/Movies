import { useState, useEffect, useContext, Suspense } from "react";
import languagesContext from "../context/languages/laguagesContext";
import sortContext from "../context/sort/sortContext";
import Card from "./Card";
import axios from "axios";

const Box = () => {
  let [state, setState] = useState([]);

  const contextLan = useContext(languagesContext);
  const { language } = contextLan;

  const contextSort = useContext(sortContext);
  const { sort } = contextSort;

  useEffect(() => {
    if (sort === "low") {
      setState(
        (state = state.sort((a, b) => {
          return b.popularity - a.popularity;
        }))
      );
    } else {
      setState(
        (state = state.sort((a, b) => {
          return a.popularity - b.popularity;
        }))
      );
    }
  }, [sort, state]);

  useEffect(() => {
    let url = "";
    if (language) {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US&page=1`;
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=es-ES&page=1`;
    }

    axios
      .get(url)
      .then((res) => {
        setState(res.data.results);
      })
      .catch((error) => console.log(error));
  }, [language]);

  useEffect(() => {
    state.forEach((movie) => {
      let defaultImg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      let key = movie.poster_path;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, defaultImg);
      }
    });
  }, [state]);

  return (
    <div className="box-container">
      <div className="container">
        <Suspense
          fallback={
            <div className="loading">
              <i className="fas fa-ticket-alt fa-10x"></i>
              <h1 className="loading">
                {language ? "Loading..." : "Cargando..."}
              </h1>
            </div>
          }
        >
          {state.map((movie, index) => (
            <Card key={movie.poster_path} movie={movie}></Card>
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default Box;
