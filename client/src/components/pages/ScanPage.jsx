import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

function ScanPage() {
  const [scanType, setScanType] = useState('message'); // 'message' or 'url'
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (input.trim() === '') return;
    try {
      const endpoint = scanType === 'message'
        ? `${API_URL}/api/auth/scan-message`
        : `${API_URL}/api/auth/scan-url`;

      const payload = scanType === 'message'
        ? { text: input }
        : { url: input };

      const res = await axios.post(endpoint, payload);
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="scan-page">
      <h2>Check a Message or Link</h2>

      <div className="scan-toggle">
        <button
          className={scanType === 'message' ? 'active' : ''}
          onClick={() => { setScanType('message'); setInput(''); setResult(null); }}
        >
          Message
        </button>
        <button
          className={scanType === 'url' ? 'active' : ''}
          onClick={() => { setScanType('url'); setInput(''); setResult(null); }}
        >
          URL
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={scanType === 'message' ? 'Paste the message here' : 'Paste the URL here'}
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