import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext";

const Login = () => {
  const url = "https://expert-capybara-gv9gq754rx7hpgv-4000.app.github.dev";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    const json = await response.json();

    if (!response.ok) {
        console.log(json.error);
        setError(json.error);
    }

    if (response.ok) {
        console.log(json);
        dispatch({type: "LOGIN", payload: json});

        localStorage.setItem("user", JSON.stringify(json));
    }
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>

      <h3>Sign In</h3>
      
      <div>
        <label>Email address</label>

        <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
        />
      </div>
      
      <div>
        <label>Password</label>
        
        <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
        />
      </div>

      <button>Login</button>
      {error && <div>{error}</div>}
    </form>
  )
}

export default Login;