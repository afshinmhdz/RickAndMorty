import "./App.css";
import CharacterList from "./component/CharacterList";
import Navbar, { Favourites, Search } from "./component/Navbar";
import CharacterDetail from "./component/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./component/Modal";
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favourites, setFavourites] = useState(()=>JSON.parse(localStorage.getItem("FAVOURITES"))||[]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData(params) {
      try {
        setIsLoading(true);
        {
          /** until data not complete loading setIsloading true */
        }
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );

        console.log(res);

        setCharacters(res.data.results);
        {
          /**whene data loading is done setIsLoading false  */
        }
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

useEffect(()=>{
  localStorage.setItem("FAVOURITES",JSON.stringify(favourites))
},[favourites])

  const handleSelectCharacter = (id) => {
    setSelectedCharacter(id);
  };

  const handleAddFavourite = (char) => {
    setFavourites([...favourites, char]);
  };

  const handleDeleteFavourite=(id)=>{
    setFavourites(favourites.filter(fav=>fav.id!==id));
  }

  const isAddtoFavourite = favourites
    .map((fav) => fav.id)
    .includes(selectedCharacter);

  return (
    <div className="app">
      {/* <Modal title={"title"} open={true}>
        this modal
      </Modal> */}
      <Toaster />
      <Navbar nomOfResult={characters.length} >
        <Search query={query} setQuery={setQuery} />
        <Favourites favourites={favourites} onDeleteFavourite={handleDeleteFavourite}/>
      </Navbar>
      <Main characters={characters}>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          characters={characters}
          selectedCharacter={selectedCharacter}
          onAddFavourite={handleAddFavourite}
          isAddtoFavourite={isAddtoFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
