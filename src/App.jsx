import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/homepage/HomePage';



console.log("testing...")


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </>
  )
}

export default App