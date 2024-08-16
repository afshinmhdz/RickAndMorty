import { HeartIcon } from "@heroicons/react/24/outline";
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
  return <input value={query} onChange={e=>setQuery(e.target.value)} type="text" className="text-field" placeholder="Search..." />;
}

export function Favourites({nomOfFavourites}){
  return(
    <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">{nomOfFavourites}</span>
      </button>
  );
}