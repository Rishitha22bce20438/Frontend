import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [balance, setBalance] = useState({});
  const [applications, setApplications] = useState([]);
  const [username, setUsername] = useState('Guest');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const API_BASE_URL = process.env.NODE_ENV === 'production' 
  //   ? 'https://rs75ba83d9.execute-api.us-west-1.amazonaws.com' 
  //   : 'http://localhost:8080';
  const API_BASE_URL='https://1nuu3c7hw7.execute-api.us-west-1.amazonaws.com/dev'

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/details`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to load user details.');
      }
    };

    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/leaves/balance`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBalance(response.data);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Failed to load leave balance.');
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/leaves/history`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching leave applications:', error);
        setError('Failed to load leave applications.');
      }
    };

    fetchUserDetails();
    fetchBalance();
    fetchApplications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Styles (consistent with other components)
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
    panelHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    panelTitle: {
      color: '#2c3e50',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    logoutButton: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#e74c3c',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    content: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      color: '#2c3e50',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      padding: '0.75rem',
      borderBottom: '1px solid #eee',
      marginBottom: '0.5rem',
    },
    text: {
      marginBottom: '0.5rem',
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
        </ul>
      </nav>

      {/* Dashboard Header with Logout Button */}
      <div style={styles.panelHeader}>
        <h1 style={styles.panelTitle}>Welcome, {username}!</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>

      {/* Dashboard Content */}
      <div style={styles.content}>
        {error && <p style={{ color: '#e74c3c', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <h2 style={styles.sectionTitle}>Leave Balance</h2>
        <p style={styles.text}>Casual Leave: {balance.casualLeaveBalance || 0}</p>
        <p style={styles.text}>Medical Leave: {balance.medicalLeaveBalance || 0}</p>

        <h2 style={styles.sectionTitle}>Leave Applications</h2>
        <ul style={styles.list}>
          {applications.length > 0 ? (
            applications.map(app => (
              <li key={app._id} style={styles.listItem}>
                {app.leaveType} from {new Date(app.startDate).toDateString()} to {new Date(app.endDate).toDateString()} - Status: {app.status}
              </li>
            ))
          ) : (
            <li style={styles.listItem}>No leave applications found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
