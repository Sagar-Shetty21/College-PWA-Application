import React, {useState} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../utils/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import LoadingScreen from '../utils/LoadingScreen';


const Login = () => {
  const { setAuth } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/authentication/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            /* 'authorization': `Bearer ${auth.accessToken}` */
          },
          body: JSON.stringify({
            userId,
            password
          })
        })
        .then(response => response.json())
        .then(data => {
          setIsLoading(false);
          if (data.error) {
            console.log(data.error.code)
            toast.error("Server Error!")
          }else if(data.result){
            setAuth({...data.result, accessToken: data.accessToken})
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 90); 
            cookies.set('user',{...data.result, accessToken: data.accessToken},{
              expires: expirationDate,
              path: "/",
            })
            toast.success("Logged in as " + data.result.name)
            navigate("/home")
          }else{
            toast.warning("Wrong credentials! Try again.")
          }
        })
  }

  return (
    <div className="login-page">
        <div className="login-card">
            <div className="login-card-content">
                <div className="header">
                    <div className="logo">
                        <div><img src="./scc-logo-nobg.png" alt="logo-img"></img></div>
                    </div>
                    <h2>Silicon City College</h2>
                    <h3>Empowerment through Knowledge</h3>
                </div>
                <div className="form">
                    <form onSubmit={handleLogin}>
                        <div className="form-field username">
                            <div className="icon">
                                <i className="fa-sharp fa-solid fa-user"></i>
                            </div>
                            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required />
                        </div>
                        <div className="form-field password">
                            <div className="icon">
                                <i className="fa-sharp fa-solid fa-lock"></i>
                            </div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        </div>
                        <button className="button" type="submit">
                            Login
                        </button>
                        <div>
                            Don't have an account? <Link to="/register">Sign Up Now</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="login-card-footer">
                <Link to="/resetpassword">Forgot password?</Link>
            </div>
        </div>
        {isLoading && <LoadingScreen />}
    </div>
  )
}

export default Login;