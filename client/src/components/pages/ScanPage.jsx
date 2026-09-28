import { useState } from 'react';
import axios from 'axios';

function ScanPage() {
  const [message, setMessage] = useState('');
  const [result, setResult ] = useState(null);

  const handleScan = async () => {
     if (message.trim() === '') return;
    try {
      const res = await axios.post('http://localhost:5000/api/scan', { text: message });
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="scan-page">
      <h2>Check a Message or Link</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste the message or link here"
      />
      <button onClick={handleScan}>Scan</button>

       {result && (
        <div className="result-card">
          <h3>Result: {result.verdict}</h3>
          <p>Confidence: {result.confidence}%</p>
          <p>Reason: {result.reason}</p>
        </div>
      )}

    </div>
  );
}
export default ScanPage;