import "./App.css";
import CharacterList from "./component/CharacterList";
import Navbar from "./component/Navbar";
import CharacterDetail from "./component/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData(params) {
      try {
        setIsLoading(true);
        {
          /** until data not complete loading setIsloading true */
        }
        const res = await axios.get("https://rickandmortyapi.com/api/characters");

        console.log(res);
        
        setCharacters(res.data.results);
        {
          /**whene data loading is done setIsLoading false  */
        }
      } catch (error) {
       toast.error(error.response.data.error)
        console.log(error.response.data.error);
        
      }
     finally{
      setIsLoading(false);
     }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Toaster/>
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
