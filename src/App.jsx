import "./App.css";
import CharacterList from "./component/CharacterList";
import Navbar, { Favourites, Search } from "./component/Navbar";
import CharacterDetail from "./component/CharacterDetail";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useCharacter from "./hooks/useCharacter";
function App() {
  
  const [query, setQuery] = useState("");
  const {isLoading,characters}=useCharacter(query)
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favourites, setFavourites] = useState(()=>JSON.parse(localStorage.getItem("FAVOURITES"))||[]);
  

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
