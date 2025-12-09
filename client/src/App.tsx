import './assets/App.css'
import { AuthContextProvider } from './auth/index.js';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import HomeWrapper from './components/HomeWrapper.js';
import Navbar from './components/Navbar.js';
import LoginScreen from './components/LoginScreen.tsx';
import PlaylistsView from './components/PlaylistsView.tsx';
import SongsCatalog from './components/SongCatalog.tsx';
import RegisterScreen from './components/RegisterScreen.tsx';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomeWrapper />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/playlists" element={<PlaylistsView />} />
            <Route path="/songs" element={<SongsCatalog />} />
            
        </Routes>      
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
