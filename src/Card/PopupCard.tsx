import placeholder from "../assets/placeholder.png";
import "./Card.css";
import { motion } from "framer-motion";

interface PopupCardProps {
  position: "left" | "" | "right";
}

const PopupCard: React.FC<PopupCardProps> = ({ position }) => {
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
              <h3 className="popup-title">ANACONDA CONFESSIONS</h3>
              <div className="rating">NC-17</div>
            </div>
            <p className="length">1hr 49m</p>
            <p className="desc">
              A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A
              Baloon Factory
            </p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="additional-info">
          <p>English</p>
          <p>Action</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PopupCard;
