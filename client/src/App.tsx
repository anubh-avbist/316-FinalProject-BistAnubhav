import './assets/App.css'
import { AuthContextProvider } from './auth/index.js';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import HomeWrapper from './components/HomeWrapper.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomeWrapper />} />
        </Routes>      
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
