import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/containers/artists/artists.tsx";


const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<Artists/>}/>

      </Routes>
    </>
  )
};

export default App
