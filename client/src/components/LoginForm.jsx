import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to authenticate the user
      const response = await fetch('http://127.0.0.1:5000/user/<id>', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { name } = data;
        localStorage.setItem('loggedIn', 'true');
        setLoggedIn(true);
        navigate('/guitars');
        alert(`Welcome ${name}!`);
      } else {
        console.error('Error during login:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default LoginForm;
