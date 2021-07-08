import { useContext, useEffect, Fragment, useRef } from "react";
import languagesContext from "../context/languages/laguagesContext";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  //const [img, setImg] = useState();
  let defaultImg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const img = useRef();
  const context = useContext(languagesContext);
  const { language } = context;

  const handleOnLoad = () => {
    let key = movie.poster_path;
    let localImg = localStorage.getItem(key);
    img.current.src = localImg ? localImg : defaultImg;
  };

  useEffect(() => {
    let key = movie.poster_path;
    let localImg = localStorage.getItem(key);
    img.current.src = localImg ? localImg : defaultImg;
  }, [img.current]);


  return (
    <Fragment>
      <div className="card">
        <img
          ref={img}
          onLoad={handleOnLoad}
          src=""
          className="card-img-top"
          alt="unreachable"
        />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <div className="cont">
            <Link to={`/movie_info/${movie.id}`} className="btn btn-primary ">
              {language ? "See more" : "Ver mas"}
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
