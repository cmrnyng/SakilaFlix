import placeholder from "../assets/placeholder.png";
import { Movie } from "../hooks/useMovieSearch";
import "./Card.css";
import { motion } from "framer-motion";
import { convertLength } from "../App";

interface PopupCardProps {
  position: "left" | "" | "right";
  movie: Movie;
}

const PopupCard: React.FC<PopupCardProps> = ({ position, movie }) => {
  const { title, description, language, length, rating, category } = movie;

  return (
    <motion.div
      className={`popup-container ${position}`}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1.4 }}
      exit={{ opacity: 0, scale: 1, transition: { delay: 0 } }}
      transition={{ duration: 0.2, delay: 0.3 }}
    >
      <div className="img-container">
        <img className="movie-img nobottomrounding" src={placeholder} draggable="false" />
      </div>
      <div className="movie-info">
        <div className="upper-sec">
          <div className="title-length">
            <div className="title-rating">
              <h3 className="popup-title">{title}</h3>
              <div className="rating">{rating}</div>
            </div>
            <p className="length">{convertLength(length)}</p>
            <p className="desc">{description}</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="additional-info">
          <p>{language?.name}</p>
          <p>{category?.name}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PopupCard;
