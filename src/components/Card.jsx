import { useEffect, Fragment, useRef } from "react";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  //const [img, setImg] = useState();
  let defaultImg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const img = useRef();

  const handleOnLoad = () => {
    let key = movie.poster_path;
    let localImg = localStorage.getItem(key);
    img.current.src = localImg ? localImg : defaultImg;
  };

  useEffect(() => {
    let key = movie.poster_path;
    let localImg = localStorage.getItem(key);
    img.current.src = localImg ? localImg : defaultImg;
  }, []);

  return (
    <Fragment>
      <Link to={`/movie_info/${movie.id}`}>
        <div className="card">
          <img
            ref={img}
            onLoad={handleOnLoad}
            src=""
            className="card-img-top"
            alt="unreachable"
          />
          
        </div>
      </Link>
    </Fragment>
  );
};

export default Card;
