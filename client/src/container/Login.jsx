import React from 'react';
import './Login.css';

const Login = () => {
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
                    <div className="form-field username">
                        <div className="icon">
                            <i class="fa-sharp fa-solid fa-user"></i>
                        </div>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="form-field password">
                        <div className="icon">
                            <i class="fa-sharp fa-solid fa-lock"></i>
                        </div>
                        <input type="password" placeholder="Password" />
                    </div>
                    <button type="submit">
                        Login
                    </button>
                    <div>
                        Don't have an account? <a href="#">Sign Up Now</a>
                    </div>
                </div>
            </div>
            <div className="login-card-footer">
                <a href="#">Forgot password?</a>
            </div>
        </div>
    </div>
  )
}

export default Login;