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