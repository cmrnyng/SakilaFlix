import placeholder from "../assets/placeholder.png";
import "./MoviePage.css";
import React, { useEffect } from "react";

interface MoviePageProps {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoviePage: React.FC<MoviePageProps> = ({ setClicked }) => {
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
            <h1>ANACONDA CONFESSIONS</h1>
            <div className="row">
              <div className="rating bigger">NC-17</div>
              <p className="moviepage-info">2017</p>
              <p className="moviepage-info">1hr 49m</p>
            </div>
            <p className="moviepage-desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate nisi molestias
              maxime sunt illo possimus reprehenderit ullam dolores, quidem voluptatibus doloremque,
              nam ratione, est animi sed unde dicta! Distinctio, ea.
            </p>
          </div>
          <div className="moviepage-right">
            <p className="moviepage-details">
              <span>Genres: </span>Action
            </p>
            <p className="moviepage-details">
              <span>Cast: </span>People People
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
