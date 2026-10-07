import { useState } from "react";
import axios from 'axios';

function ReportPage() {
    const [ text, setText] = useState('');
    const [reportedAs, setReportedAs] = useState('Scam');
    const [message, setMessage] = useState('');

    const handleReport = async () => {
    if (text.trim() === '') return;
    try {
        await axios.post('https://localhost:5000/api/report', { text, reportedAs });
        setMessage('Thank you! Your report has been submitted.');
        setText('');
    } catch (err) {
        setMessage('Something went wrong');
        console.log(err);
    }
    };

     return (
    <div className="report-page">
      <h2>Report a Scam</h2>
      <p>Found a scam that our system missed? Let us know.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the message here"
      />
      <select value={reportedAs} onChange={(e) => setReportedAs(e.target.value)}>
        <option value="Scam">This is a Scam</option>
        <option value="Safe">This is actually Safe</option>
      </select>
      <button onClick={handleReport}>Submit Report</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReportPage;
