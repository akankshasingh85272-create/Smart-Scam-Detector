import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <h3>Smart Scam Detector</h3>
            <div className="nav-links">
                <Link to="/scan">Scan</Link>
                <Link to="/history">History</Link>
                <Link to="/loginn">Login</Link>
                <Link to="/report">Report</Link>
            </div>
        </nav>
    );
}

export default Navbar;