import React, {useState} from 'react'
import './login.css'
import { toast } from 'react-toastify';
import useAuth from '../utils/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login = () => {

  const { setAuth } = useAuth();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/authentication/login/admin`, {
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
          if (data.error) {
            console.log(data.error.code)
            alert("Server Error!")
          }else if(data.admin_id){
            setAuth({...data, accessToken: data.accessToken})
            cookies.set('admin',{...data})
            toast.success("Logged in as admin")
            navigate("/dashboard")
          }else{
            alert("Wrong credentials! Try again.")
          }
        })
  }

  return (
    <div className="login-page">
        <div className="wrap">
            <div className="box">
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <div className="logo-wrap">
                            <i className="fa-solid fa-key"></i>
                        </div>
                        <h1>Welcome Back!</h1>
                        <div className="input-box">
                            <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} value={userId} maxLength="20" required />
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                            <i className="fa-solid fa-lock" />
                        </div>
                        <div className="input-box">
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login