import { useState } from "react";
import axios from 'axios';

function Login() {
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [message, setMessage ] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setMessage('Login successful!');
      console.log(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
      console.log(err);
    }
  };

  return(
    <div className="auth-page">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email}
      onChange={(e) => setEmail(e.target.value)}/>

      <input type="password" placeholder="Password" value={password}
      onChange={(e) => setPassword(e.target.value)}/>

      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
      <p>New user? <a href="/signup">Signup</a></p>
    </div>
  );

}

export default Login;