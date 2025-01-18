import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/containers/artists/artists.tsx";
import Albums from "./features/containers/albums/albums.tsx";
import Tracks from "./features/containers/tracks/tracks.tsx";


const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<Artists/>}/>
          <Route path="/artists" element={<Artists/>}/>
          <Route path="/albums/:idArtist" element={<Albums/>}/>
          <Route path="/tracks/:idAlbum" element={<Tracks/>}/>
      </Routes>
    </>
  )
};

export default App
