import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';





console.log("refactoring...")


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