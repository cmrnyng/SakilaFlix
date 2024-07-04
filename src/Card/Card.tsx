import "./Card.css";
import placeholder from "../assets/placeholder.png";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PopupCard from "./PopupCard";
import MoviePage from "../MoviePage/MoviePage";

interface CardProps {
  op?: boolean;
}

const Card: React.FC<CardProps> = ({ op }) => {
  const [hover, setHover] = useState<boolean>(op || false);
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
          <h3 className="movie-title">ANACONDA CONFESSIONS</h3>
        </div>
      </div>
      <AnimatePresence>
        {hover && !clicked && <PopupCard position={popupPosition} />}
      </AnimatePresence>
      {clicked && <MoviePage setClicked={setClicked} />}
    </div>
  );
};

export default Card;
