import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setIsAuthenticated} = useAuth();
    const navigate = useNavigate();
    const login = async (e) => {   
        // Will have to replace this code with an API call to a backend later
        e.preventDefault();
        if(username == "john" && password == "smith") {
            alert("Logged In");
            setIsAuthenticated(true);
            navigate("/");
        }
        else {
            alert("Faulty Info");
        }
    }

    return(
        <>
        <div className="flex flex-col">
            <form className="flex flex-col justify-center items-center gap-4 mb-8" onSubmit={login}>
                <h1 className="text-6xl mb-4">Welcome to Whitelist!</h1>
                <input type="text" placeholder="Username" class="input" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" class="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" class="btn btn-md btn-primary">Login</button>
            </form>
        </div>
        </>
    )
}

export default Login 