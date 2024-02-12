import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a POST request to your backend API to authenticate the user
      // Assuming successful login
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true); // Set loggedIn state to true
      // Redirect the user to the guitar list page
      navigate('/guitars');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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

