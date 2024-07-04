import "./NavBar.css";
import logo from "../assets/sakilaflixlogo.png";
import search from "../assets/search.svg";
import { useState } from "react";
import useOnOutsideClick from "../hooks/useOnClickOutside";
import { motion, AnimatePresence } from "framer-motion";

interface NavBarProps {
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
}

const NavBar: React.FC<NavBarProps> = ({ handleSearch }) => {
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
          <select name="category" id="category" className="dropdown">
            <option value="">Genre</option>
          </select>
          <select name="language" id="language" className="dropdown">
            <option value="">Language</option>
          </select>
        </div>
        <div className="sort">
          <p>Sort by</p>
          <select name="sort" id="sort" className="dropdown">
            <option value="">A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
