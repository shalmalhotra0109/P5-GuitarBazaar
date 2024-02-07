import { useState } from "react";


function LoginForm() {
    //logged in user context from App
    const { user, setUser } = useOutletContext();
    //control login form fields
    const [userName, userNameChange] = useState("");
    const [pass, passChange] = useState("");
    //react router hooks
    let location = useLocation();
    const navigate = useNavigate();
    //make sure form entries are valid
    const validate = () => {
      let valid = true;
      if (!userName) {
        valid = false;
        alert("Please enter a user name.");
      }
      if (!pass) {
        valid = false;
        alert("Please enter a password.");
      }
      return valid;
    };
     //if user checks out, set context to their user object. redirect to home if they accessed the form from the login page
  const authenticate = currentUser => {
    setUser(currentUser);
    if (location.pathname === "/login") navigate("/");
  };
  //on form submission, retrieve user data about specified username and authenticate user against server data
  const handleLogin = async e => {
    e.preventDefault();
    if (validate()) {
      const resp = await fetch(
        `https://${userName}`
      );
      const loginAttempt = await resp.json();
      if (loginAttempt.pass === pass) authenticate(loginAttempt);
    }
  };
  if (user)
    return (
      <div>
        <h2>Welcome, {user.name}</h2>
        <p>
          Would you like to go to your{" "}
          <Link to={`${user.id}`}>profile</Link> or log out?
        </p>
      </div>
    );
  else
    return (
      <form id="loginForm" onSubmit={handleLogin}>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={e => userNameChange(e.target.value)}
          value={userName}
          required
        />
        <br />
        <label htmlFor="pass">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={e => passChange(e.target.value)}
          value={pass}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    );
}

export default LoginForm;