import './App.css'
import CharacterList from './component/CharacterList'
import Navbar from './component/Navbar'
import CharacterDetail from './component/CharacterDetail'
function App() {
 
  return (
    <div className="app">
        <Navbar/>  
      <div className="main">
        <CharacterList />
        <CharacterDetail/>
      </div>
    </div>
  )
}

export default App
