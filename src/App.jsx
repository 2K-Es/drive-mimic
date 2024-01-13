import './App.css'
import Main from './components/main'
import Topbar from './components/topbar'

function App() {

  return (
    <>
      <div className='topbar'>
        <Topbar />
      </div>
      <div>
        <Main />
      </div>
    </>
  )
}

export default App
