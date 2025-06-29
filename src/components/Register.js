import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? 'https://leavemanagement-qaub.onrender.com' 
        : 'http://localhost:8080';

      const response = await axios.post(`${API_BASE_URL}/api/register`, { 
        username, 
        email, 
        password, 
        confirmPassword 
      });
      setMessage(response.data.message);

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred during registration");
      }
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    title: {
      color: '#2c3e50',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    appHeader: {
      color: '#3498db',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#3498db',
    },
    button: {
      padding: '0.75rem',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#3498db',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#2980b9',
    },
    message: {
      color: '#e74c3c',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    text: {
      textAlign: 'center',
      marginTop: '1rem',
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.appHeader}>Leave Management System</h1>
      </header>
      <h1 style={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <p style={styles.message}>{message}</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={styles.input}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p style={styles.text}>
        Already have an account?{' '}
        <a href="/login" style={styles.link}>Login</a>
      </p>
    </div>
  );
};

export default Register;
