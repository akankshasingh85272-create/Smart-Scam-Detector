import { useState } from 'react';

function Login() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

    const handleLogin = () => {
       console.log('Login attempt:', email, password);
           // yahan baad mein backend API call aayegi
    };

    return (
      <div className="auth-page">
            <h2>Login Here</h2>
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
            <button onClick={handleLogin}>login</button>
            <p>New user? <a href="/signup">Signup</a></p>
            </div>
    );
}
export default Login;