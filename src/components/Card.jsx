import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  let defaultImg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const img = useRef();

  const handleOnLoad = async () => {
    let name = movie.poster_path;
    let localImg = await localStorage.getItem(name);
    img.current.src = await localImg ? localImg : defaultImg;
  };

  useEffect(() => {
    handleOnLoad();
  }, []);

  return (
    <Link to={`/movie_info/${movie.id}`}>
      <div className="card">
        <img
          ref={img}
          src=""
          className="card-img-top"
          alt="unreachable"
        />
      </div>
    </Link>
  );
};

export default Card;
