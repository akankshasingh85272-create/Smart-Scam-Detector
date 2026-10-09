import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ScanPage from './components/pages/ScanPage';
import History from './components/pages/History';
import ReportPage from './components/pages/ReportPage';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;