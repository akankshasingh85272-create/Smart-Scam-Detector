import { useState, useEffect } from 'react';
import axios from 'axios';

function History() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/scan')
      .then((res) => setScans(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="history-page">
      <h2>Scan History</h2>
      {scans.length === 0 ? (
        <p>No scans yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>Reason</th>
              <th>Result</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan._id}>
                <td>{scan.text}</td>
                <td>{scan.verdict}</td>
                <td>{scan.reason}</td>
                <td>{new Date(scan.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;