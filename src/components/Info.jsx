import { useState, useEffect, useContext, Fragment } from "react";
import languagesContext from "../context/languages/laguagesContext";
import YouTubePlayer from "react-player/youtube";
import axios from "axios";

const Info = (props) => {
  const { movie } = props.match.params;
  let [state, setState] = useState();
  let [image, setImage] = useState();
  let [video, setVideo] = useState();
  let [movieGenres, setMovieGenres] = useState([]);

  const context = useContext(languagesContext);
  const { language } = context;

  useEffect(() => {
    let url = "";
    if (language) {
      url = `https://api.themoviedb.org/3/movie/${movie}?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${movie}?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=es-ES`;
    }

    axios
      .get(url)
      .then((res) => {
        setState((state = res.data));
        setImage(`https://image.tmdb.org/t/p/w342/${state.poster_path}`);
      })
      .catch((error) => console.log(error));
  }, [language]);

  useEffect(() => {
    let genres = [];
    let aux = [];
    let url = "";
    if (language) {
      url =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US";
    } else {
      url =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=es-ES";
    }
    axios
      .get(url)
      .then((res) => {
        genres = res.data.genres;
        for (let stgen = 0; stgen < state.genres.length; stgen++) {
          for (let gen = 0; gen < genres.length; gen++) {
            if (state.genres[stgen].id === genres[gen].id) {
              aux.push(genres[gen].name);
            }
          }
        }
        setMovieGenres((movieGenres = aux));
      })
      .catch((error) => console.log(error));
  }, [state]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie}}/videos?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US`
      )
      .then((res) => {
        let results = res.data.results;
        let key = results[1] !== undefined ? results[1].key : results[0].key;
        setVideo((video = `https://www.youtube.com/watch?v=${key}`));
      })
      .catch((error) => console.log(error));
  });

  return (
    <div className="info-container">
      {state !== undefined ? (
        <Fragment>
          <div className="info-box">
            <div className="info-image">
              <img src={image} alt="..." />
            </div>
            <div className="info-content">
              <h2>
                {language ? "Title:" : "Titúlo:"} {state.title}
              </h2>
              <h5>
                {movieGenres.map((genre, index) => (
                  <span key={index}> {genre}</span>
                ))}
              </h5>
              <p>{state.overview}</p>
              <p>
                <i className="far fa-star"></i> {state.vote_average}
              </p>
              <p>
                {language ? "Release" : "Lanzamiento"}: {state.release_date}
              </p>
            </div>
          </div>
          <h2>Trailer</h2>
          <div className="video-box">
            <YouTubePlayer
              url={video}
              className="react-player"
              width="100%"
              height="100%"
            />
          </div>
        </Fragment>
      ) : (
        <div className="loading">
          <i className="fas fa-ticket-alt fa-10x"></i>
          <h1 className="loading">{language ? "Loading..." : "Cargando..."}</h1>
        </div>
      )}
    </div>
  );
};

export default Info;
