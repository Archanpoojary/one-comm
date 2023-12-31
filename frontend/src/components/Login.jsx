import react, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    useEffect ( () => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [])
    const handleLogin = async () => {
        console.warn("email,password", email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json()
        console.warn(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/')
        } else {
            alert("Please enter correct details");
        }

    }
    return (
        <div className='login'>
            <input type='text' className="inputBox" placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' className="inputBox" placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="appbutton" type="button">Login</button>
        </div>
    );
}

export default Login;