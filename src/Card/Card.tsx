import "./Card.css";
import placeholder from "../assets/placeholder.png";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PopupCard from "./PopupCard";
import MoviePage from "../MoviePage/MoviePage";
import { Movie } from "../hooks/useMovieSearch";

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  const [hover, setHover] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<"left" | "" | "right">("");
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hover && card.current) {
      const rect = card.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const popupWidth = 280;
      const spaceOnRight = screenWidth - rect.right;
      const spaceOnLeft = rect.left;

      if (spaceOnLeft > popupWidth && spaceOnRight > popupWidth) {
        setPopupPosition("");
      } else if (spaceOnRight < popupWidth && spaceOnLeft >= popupWidth) {
        setPopupPosition("left");
      } else {
        setPopupPosition("right");
      }
    }
  }, [hover]);

  return (
    <div
      className="card-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        setClicked(true);
        setHover(false);
      }}
      ref={card}
    >
      <div className="img-container">
        <img className="movie-img" src={placeholder} draggable="false" />
        <div className="title-container">
          <h3 className="movie-title">{movie.title}</h3>
        </div>
      </div>
      <AnimatePresence>
        {hover && !clicked && <PopupCard position={popupPosition} movie={movie} />}
      </AnimatePresence>
      {clicked && <MoviePage setClicked={setClicked} movie={movie} />}
    </div>
  );
};

export default Card;
