import { useState } from "react";
import axios from 'axios';
import { API_URL } from '../../config';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);


  const handleSignup = async () => {
    try {
       await axios.post(axios.post(`${API_URL}/api/auth/signup`), {
        name,
        email,
        password,
      });
      setMessage('Signup successful!');
     setSuccess(true);
      } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
      setSuccess(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      <input
        type="text"
      placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      {message && <p>{message}</p>}
       {success && <a href="/login"><button>Go to Login</button></a>}
    </div>
  );
}

export default Signup;
