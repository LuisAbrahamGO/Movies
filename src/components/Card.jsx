import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  const img = useRef();
  let defaultImg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;


  useEffect(() => {

    
   let title = `${movie.title}`;
    if (!localStorage.getItem(title)) {
      localStorage.setItem(title, defaultImg);
      let dataImg = localStorage.getItem(title);
      img.current.src = dataImg;
    } else {
      let dataImg = localStorage.getItem(title);
      img.current.src = dataImg;
    }

    
  }, []);

  return (
    <div className="card">
      <img
        ref= {img}
        src=""
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{movie.original_title}</h5>
        <div className="cont">
          <button className="btn btn-dark">
            <i className="far fa-heart"></i>
          </button>
          <Link to={`/movie_info/${movie.id}`} className="btn btn-primary ">
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
