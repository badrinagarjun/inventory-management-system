import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuth } from './AuthContext';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const {setUser} = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login/user/user/login', {
          username: email,
          password : password
      });
      if (response.status === 200) {
          const token = response.data;
          const decodedToken = jwtDecode(token);
          
          const role = decodedToken.Role;
          const userEmail = decodedToken.Email;
          setUser(role);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('userRole', role);
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('tokenExpiration', Date.now() + 1800000);

          if (role === 'admin') {
              navigate('/dashboard');
              alert('Admin Logged In Successfully');
          } else {
              navigate('/dashboard');
              alert('Logged In Successfully');
          }
          
      }
  } catch (error) {
      if (error.response) {
          if (error.response.status === 404) {
              alert('User not found!');
              handleSignup();
          } else if (error.response.status === 401) {
              alert('Invalid Credentials.');
            } else {
              alert('Invalid Credentials.');
            }
          } else {
              alert('Error Signing Up. Try Again!!!');
          }
  }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-background">
      <div className="container21">
        <div className="left21">
          <p className="monash-heading21">Sign in</p>
          <p>to access Inventory</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button onClick={handleLogin} className="primary-button21">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="signup-container">
            <p>
              Don't have an account?{' '}
              <span className="secondary-small" onClick={handleSignup} style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}>
                Signup
              </span>
            </p>
          </div>
        </div>
        <div className="right21">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzoeBdl1rocMv8k8rSDjSxoW_QO4-jZz5dMA&s"
            width="350"
            height="450"
            alt="Login illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
