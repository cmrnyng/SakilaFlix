import { convertLength, convertName } from "../App";
import placeholder from "../assets/placeholder.png";
import { Movie } from "../hooks/useMovieSearch";
import "./MoviePage.css";
import React, { useEffect } from "react";

interface MoviePageProps {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  movie: Movie;
}

const MoviePage: React.FC<MoviePageProps> = ({ setClicked, movie }) => {
  const { title, description, releaseYear, language, length, rating, category, cast } = movie;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Escape") setClicked(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setClicked(false);
  };

  return (
    <div className="moviepage" onClick={handleClose}>
      <div className="moviepage-container" onClick={e => e.stopPropagation()}>
        <div className="moviepage-img-container">
          <img src={placeholder} className="moviepage-img nobottomrounding" />
        </div>
        <div className="main-content">
          <div className="moviepage-left">
            <h1>{title}</h1>
            <div className="row">
              <div className="rating bigger">{rating}</div>
              <p className="moviepage-info">{releaseYear}</p>
              <p className="moviepage-info">{convertLength(length)}</p>
              <p className="moviepage-info">{language.name}</p>
            </div>
            <p className="moviepage-desc">{description}</p>
          </div>
          <div className="moviepage-right">
            <p className="moviepage-details">
              <span>Genres: </span>
              {category?.name}
            </p>
            <p className="moviepage-details">
              <span>Cast: </span>
              {cast.map((actor, index) => (
                <span key={index}>
                  {convertName(actor.firstName + " " + actor.lastName)}
                  {index !== cast.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
