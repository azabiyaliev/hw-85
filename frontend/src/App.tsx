import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/containers/artists.tsx";
import Albums from "./features/albums/containers/albums.tsx";
import Tracks from "./features/tracks/containers/tracks.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import TrackHistories from "./features/trackHistories/trackHistories.tsx";
import NewArtist from "./features/artists/containers/NewArtist.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import NewAlbum from "./features/albums/containers/NewAlbum.tsx";
import NewTrack from "./features/tracks/containers/NewTrack.tsx";


const App = () => {

    const user = useAppSelector(selectUser);

  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<Artists/>}/>
          <Route path="/artists" element={<Artists/>}/>
          <Route path="/albums/:idArtist" element={<Albums/>}/>
          <Route path="/tracks/:idAlbum" element={<Tracks/>}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/trackHistory" element={<TrackHistories />} />
          <Route path="/add-artist" element={
              <ProtectedRoute isAllowed={user && (user.role === "admin" || user.role === "user")}>
                  <NewArtist/>
              </ProtectedRoute>
          }/>
          <Route path="/add-album" element={
              <ProtectedRoute isAllowed={user && (user.role === "admin" || user.role === "user")}>
                  <NewAlbum/>
              </ProtectedRoute>
          }/>
          <Route path="/add-track" element={
              <ProtectedRoute isAllowed={user && (user.role === "admin" || user.role === "user")}>
                  <NewTrack/>
              </ProtectedRoute>
          }/>
      </Routes>
    </>
  )
};

export default App
