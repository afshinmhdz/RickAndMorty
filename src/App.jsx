import './App.css'
import CharacterList from './component/CharacterList'
import Navbar from './component/Navbar'
import {allCharacters} from '../data/data'
import CharacterDetail from './component/CharacterDetail'
function App() {
 
  return (
    <div className="app">
        <Navbar/>  
      <div className="main">
        <CharacterList characters={allCharacters}/>
        <CharacterDetail/>
      </div>
    </div>
  )
}

export default App
