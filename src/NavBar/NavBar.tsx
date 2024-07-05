import "./NavBar.css";
import logo from "../assets/sakilaflixlogo.png";
import search from "../assets/search.svg";
import { useState } from "react";
import useOnOutsideClick from "../hooks/useOnClickOutside";
import { motion, AnimatePresence } from "framer-motion";

interface NavBarProps {
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
  handleCategory: React.ChangeEventHandler<HTMLSelectElement>;
  handleLanguage: React.ChangeEventHandler<HTMLSelectElement>;
  handleSort: React.ChangeEventHandler<HTMLSelectElement>;
}

const NavBar: React.FC<NavBarProps> = ({
  handleSearch,
  handleCategory,
  handleLanguage,
  handleSort,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const { innerBorderRef } = useOnOutsideClick<HTMLInputElement>(() => setActive(false));

  return (
    <div className="container">
      <div className="top-bar">
        <img className="logo" src={logo} />
        <motion.div className={`search-container ${active ? "open" : ""}`} layout>
          <img
            src={search}
            className="search-icon"
            onClick={() => setActive(true)}
            draggable="false"
          />
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="input-wrapper"
              >
                <input
                  ref={innerBorderRef}
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search by title"
                  onChange={handleSearch}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="filter-sort">
        <div className="filter">
          <p>Filter by</p>
          <select name="category" id="category" className="dropdown" onChange={handleCategory}>
            <option value="">Genre</option>
            <option value="Action">Action</option>
            <option value="Animation">Animation</option>
            <option value="Children">Children</option>
            <option value="Classics">Classics</option>
            <option value="Comedy">Comedy</option>
            <option value="Documentary">Documentary</option>
            <option value="Drama">Drama</option>
            <option value="Family">Family</option>
            <option value="Foreign">Foreign</option>
            <option value="Games">Games</option>
            <option value="Horror">Horror</option>
            <option value="Music">Music</option>
            <option value="New">New</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
          </select>
          <select name="language" id="language" className="dropdown" onChange={handleLanguage}>
            <option value="">Language</option>
            <option value="English">English</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Mandarin">Mandarin</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
        <div className="sort">
          <p>Sort by</p>
          <select name="sort" id="sort" className="dropdown" onChange={handleSort}>
            <option value="title,asc">A-Z</option>
            <option value="title,desc">Z-A</option>
            <option value="releaseYear,asc">Newest</option>
            <option value="releaseYear,desc">Oldest</option>
            <option value="length,desc">Longest</option>
            <option value="length,asc">Shortest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
