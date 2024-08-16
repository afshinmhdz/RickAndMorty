import "./App.css";
import CharacterList from "./component/CharacterList";
import Navbar, { Favourites, Search } from "./component/Navbar";
import CharacterDetail from "./component/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query,setQuery]=useState("")
  const [selectedCharacter,setSelectedCharacter]=useState(null);
  const [favourites,setFavourites]=useState([]);
  useEffect(() => {
    async function fetchData(params) {
      try {
        setIsLoading(true);
        {
          /** until data not complete loading setIsloading true */
        }
        const res = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`);

        console.log(res);
        
        setCharacters(res.data.results);
        {
          /**whene data loading is done setIsLoading false  */
        }
      } catch (error) {
       setCharacters([]);
        toast.error(error.response.data.error)
        
        
      }
     finally{
      setIsLoading(false);
     }
    }
    fetchData();
  }, [query]);
  
  const handleSelectCharacter=(id)=>{
    setSelectedCharacter(id)
  }

  const handleAddFavourite=(char)=>{
    setFavourites([...favourites,char])
  }

  const isAddtoFavourite  =favourites.map((fav)=>fav.id).includes(selectedCharacter);

  return (
    <div className="app">
      <Toaster/>
      <Navbar nomOfResult={characters.length} >
        <Search query={query} setQuery={setQuery}/>
        <Favourites nomOfFavourites={favourites.length}/>
      </Navbar>
      <Main characters={characters}>
        <CharacterList characters={characters} isLoading={isLoading} onSelectCharacter={handleSelectCharacter}/>
        <CharacterDetail characters={characters} selectedCharacter={selectedCharacter} onAddFavourite={handleAddFavourite} isAddtoFavourite={isAddtoFavourite}/>
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
