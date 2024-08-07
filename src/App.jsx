import "./App.css";
import CharacterList from "./component/CharacterList";
import Navbar from "./component/Navbar";
import CharacterDetail from "./component/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData(params) {
      setIsLoading(true);
      {
        /** until data not complete loading setIsloading true */
      }
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results);
      setIsLoading(false);
      {
        /**whene data loading is done setIsLoading false  */
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Navbar nomOfResult={characters.length} />
      <Main characters={characters}>
        <CharacterList characters={characters} isLoading={isLoading}/>
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
