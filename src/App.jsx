import "./App.css";
import CharacterList from "./component/CharacterList";
import Navbar from "./component/Navbar";
import CharacterDetail from "./component/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData(params) {
      const res=await fetch("https://rickandmortyapi.com/api/character")
      const data=await res.json();
      setCharacters(data.results)
    }
    fetchData();
  },[]);

  return (
    <div className="app">
      <Navbar nomOfResult={characters.length} />
      <Main characters={characters}>
        <CharacterList characters={characters} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
