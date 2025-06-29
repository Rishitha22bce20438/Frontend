import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ApplyLeave = () => {
  const [leaveType, setLeaveType] = useState('casual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Define API base URL based on environment
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://rs75ba83d9.execute-api.us-west-1.amazonaws.com/prod' 
    : 'http://localhost:8080';

  const validateDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      alert('The end date cannot be before the start date. Please correct it.');
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDateRange(startDate, endDate)) {
      return;
    }
    try {
      await axios.post(
        `${API_BASE_URL}/leaves/apply`,
        { leaveType, startDate, endDate, reason },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred while applying for leave.');
      }
      console.error('Error applying leave:', error);
    }
  };

  // Styles (expanded for ApplyLeave)
  const styles = {
    container: {
      maxWidth: '800px',
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
    appHeader: {
      color: '#3498db',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
    },
    title: {
      color: '#2c3e50',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    nav: {
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      borderRadius: '6px',
      marginBottom: '2rem',
    },
    navList: {
      listStyle: 'none',
      display: 'flex',
      gap: '1rem',
      padding: 0,
      margin: 0,
    },
    navItem: {
      display: 'inline-block',
    },
    navLink: {
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'color 0.3s',
    },
    navLinkHover: {
      color: '#2980b9',
    },
    button: {
      background: 'none',
      border: 'none',
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      padding: 0,
    },
    message: {
      color: '#e74c3c',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    content: {
      marginBottom: '2rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    label: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    input: {
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    select: {
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    textarea: {
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      minHeight: '100px',
      outline: 'none',
      fontFamily: 'inherit',
      resize: 'vertical',
      transition: 'border-color 0.3s',
    },
    submitButton: {
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
    submitButtonHover: {
      backgroundColor: '#2980b9',
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.appHeader}>Leave Management System</h1>
      </header>

      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/dashboard" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/apply-leave" style={styles.navLink}>Apply Leave</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.navLink}>About</Link>
          </li>
          <li style={styles.navItem}>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </li>
        </ul>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.title}>Apply for Leave</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {message && <p style={styles.message}>{message}</p>}

          <label style={styles.label}>Leave Type:</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            style={styles.select}
          >
            <option value="casual">Casual Leave</option>
            <option value="medical">Medical Leave</option>
          </select>

          <label style={styles.label}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for leave"
            required
            style={styles.textarea}
          ></textarea>

          <button type="submit" style={styles.submitButton}>Apply</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
