import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ScanPage from './components/pages/ScanPage';
import History from './components/pages/History';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;