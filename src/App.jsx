import './App.css'
import CharacterList from './component/CharacterList'
import Navbar from './component/Navbar'
import {allCharacters} from '../data/data'
function App() {
 
  return (
    <div className="app">
        <Navbar/>  
      <div className="main">
        <CharacterList characters={allCharacters}/>
      </div>
    </div>
  )
}

export default App
