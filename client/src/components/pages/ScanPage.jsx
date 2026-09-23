import { useState } from 'react';

function ScanPage() {
  const [message, setMessage] = useState('');

  const handleScan = () => {
    console.log('Scanning:', message);
    // baad mein yahan backend API call aayegi
  };

  return (
    <div>
      <h2>Check a Message or Link</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste the message or link here"
      />
      <button onClick={handleScan}>Scan</button>
    </div>
  );
}
export default ScanPage;