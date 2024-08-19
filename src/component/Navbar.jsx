import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";
function Navbar({ children, nomOfResult }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO 😍</div>

      {children}
      <div className="navbar__result">found {nomOfResult} Character</div>
    </nav>
  );
}

export default Navbar;

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="Search..."
    />
  );
}

export function Favourites({ favourites,onDeleteFavourite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Modal onOpen={setIsOpen} open={isOpen} title="List of Favourite">
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button className="icon red" onClick={()=>onDeleteFavourite(item.id)}>
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </div>
  );
}
