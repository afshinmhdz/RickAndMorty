import "./App.css";
import CharacterList from "./component/CharacterList";
import Navbar from "./component/Navbar";
import CharacterDetail from "./component/CharacterDetail";
import { allCharacters } from "../data/data";
import { useState } from "react";
function App() {
  const [characters, setCharacters] = useState(allCharacters);
  return (
    <div className="app">
      <Navbar nomOfResult={characters.length} />
      <Main characters={characters}/>
    </div>
  );
}

export default App;

function Main({characters}) {
  return (
    <div className="main">
      <CharacterList characters={characters} />
      <CharacterDetail />
    </div>
  );
}
