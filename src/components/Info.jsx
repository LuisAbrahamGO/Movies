import { useState, useEffect, Fragment } from "react";
import axios from "axios";

const Info = (props) => {
  const { movie } = props.match.params;
  let [state, setState] = useState();
  let [image, setImage] = useState();
  let [movieGenres, setMovieGenres] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie}?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US`
      )
      .then((res) => {
        setState((state = res.data));
        setImage(`https://image.tmdb.org/t/p/w342/${state.poster_path}`);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let genres = [];
    let aux = [];
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=b3a99e49d4ea019e4e8f3a928062f42b&language=en-US"
      )
      .then((res) => {
        genres = res.data.genres;
        console.log(state.genres.length);
        console.log(genres);
        for(let stgen = 0; stgen < state.genres.length; stgen++){
          for(let gen = 0; gen < genres.length; gen++){
            if(state.genres[stgen].id === genres[gen].id){
                aux.push(genres[gen].name)
            }
          }
        }
        setMovieGenres(movieGenres = aux);
        console.log(movieGenres);
      })
      .catch((error) => console.log(error));
  }, [state]);

  console.log(state);

  return (
    <div className="info-container">
      {state !== undefined ? (
        <div className="info-box">
          <div className="info-image">
            <img src={image} alt="..." />
          </div>
          <div className="info-content">
            <h2>Title: {state.title}</h2>
            <h5>{movieGenres.map((genre, index) => (
              <span key={index}> {genre}</span>
            ))}</h5>
            <p>{state.overview}</p>
            <p>
              <i className="far fa-star"></i> {state.vote_average}
            </p>
            <p>Release: {state.release_date}</p>
          </div>
        </div>
      ) : (
        <h1 className="loading">Loading...</h1>
      )}
    </div>
  );
};

export default Info;
