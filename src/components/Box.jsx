import { useState, useEffect, useContext, Suspense } from "react";
import languagesContext from "../context/languages/laguagesContext";
import sortContext from "../context/sort/sortContext";
import Card from "./Card";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Box = () => {
  let [state, setState] = useState([]);
  let [pages, setPages] = useState(1);

  const contextLan = useContext(languagesContext);
  const { language } = contextLan;

  const contextSort = useContext(sortContext);
  const { sort } = contextSort;

  const handleSeeMore = () => {
    let url = "";
    setPages(++pages);
    if (language) {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US&page=${pages}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=es-ES&page=${pages}`;
    }

    axios
      .get(url)
      .then((res) => {
        setState(state.concat(res.data.results));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {}, [state]);

  useEffect(() => {
    if (sort === "low") {
      setState(
        state.sort((a, b) => {
          return b.popularity - a.popularity;
        })
      );
    } else {
      setState(
        state.sort((a, b) => {
          return a.popularity - b.popularity;
        })
      );
    }
  }, [sort]);

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

    setPages(1);
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

  console.log(pages);

  return (
    <div className="box-container">
      <InfiniteScroll
        dataLength={state.length}
        next={handleSeeMore}
        hasMore={pages !== 6 ? true : false}
        loader={
          <div className="loading">
            <i className="fas fa-ticket-alt"></i>
            <h1 className="loading">
              {language ? "Loading..." : "Cargando..."}
            </h1>
          </div>
        }
        className="container"
      >
        {state.map((movie, index) => (
          <Card key={movie.poster_path} movie={movie}></Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Box;
