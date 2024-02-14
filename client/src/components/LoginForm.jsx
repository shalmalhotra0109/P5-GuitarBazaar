import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './LoginFormAnimation.css';
import LoginFormAnimation from './LoginFormAnimation.jsx';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username:username, 
          password:password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/guitars');
      } else {
        console.error('Error during login:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div class="login-container">
      <div class="login-wrapper">
        <h1>Welcome to the Guitar Bazaar! Please Log In!</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <LoginFormAnimation />
      </div>
    </div>
  );
}

export default LoginForm;