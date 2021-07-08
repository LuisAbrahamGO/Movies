import { useContext } from "react";
import languagesContext from "../context/languages/laguagesContext";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  let defaultImg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const context = useContext(languagesContext);
  const { language } = context;

  return (
    <div className="card">
      <img src={defaultImg} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <div className="cont">
          <Link to={`/movie_info/${movie.id}`} className="btn btn-primary ">
            {language? "See more" : "Ver mas"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
