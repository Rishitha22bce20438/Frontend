import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// const API_BASE_URL = process.env.NODE_ENV === 'production' 
//   ? 'https://rs75ba83d9.execute-api.us-west-1.amazonaws.com' 
//   : 'http://localhost:8080';
const API_BASE_URL='https://1nuu3c7hw7.execute-api.us-west-1.amazonaws.com/dev'

const AdminPanel = () => {
  const [applications, setApplications] = useState([]);
  const [grantedApplications, setGrantedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/leaves/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const allApplications = response.data;
        const granted = allApplications.filter(app => app.status === 'approved');
        const rejected = allApplications.filter(app => app.status === 'rejected');
        setApplications(allApplications);
        setGrantedApplications(granted);
        setRejectedApplications(rejected);
      } catch (error) {
        console.error('Error fetching leave applications:', error);
      }
    };
    fetchApplications();
  }, []);

  const handleApproval = async (applicationId) => {
  try {
    await axios.post(`${API_BASE_URL}/leaves/approve`, { applicationId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    const updatedApp = applications.find(app => app.applicationId === applicationId);

    setApplications(prevApps =>
      prevApps.map(app =>
        app.applicationId === applicationId ? { ...app, status: 'approved' } : app
      )
    );

    setGrantedApplications(prevGrants => [
      ...prevGrants,
      { ...updatedApp, status: 'approved' }
    ]);

    setRejectedApplications(prevRejects =>
      prevRejects.filter(app => app.applicationId !== applicationId)
    );
  } catch (error) {
    console.error('Error approving leave application:', error);
  }
};


  const handleRejection = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/leaves/reject`, { applicationId: id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const updatedApp = applications.find(app => app._id === id);
      setApplications(prevApps => prevApps.map(app => app._id === id ? { ...app, status: 'rejected' } : app));
      setRejectedApplications(prevRejects => [...prevRejects, { ...updatedApp, status: 'rejected' }]);
      setGrantedApplications(prevGrants => prevGrants.filter(app => app._id !== id));
    } catch (error) {
      console.error('Error rejecting leave application:', error);
    }
  };

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
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      color: '#2c3e50',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '1rem',
    },
    tableHeader: {
  backgroundColor: '#f5f7fa',   // Lighter, softer background
  fontWeight: 'bold',
  padding: '0.5rem',            // Smaller padding for a more compact look
  textAlign: 'left',
  borderBottom: '1px solid #e1e5eb',  // Lighter border
  color: '#4a5568',             // Softer, less contrast text color
  fontSize: '0.85rem'           // Smaller font size
}
,
    tableRow: {
      borderBottom: '1px solid #eee',
    },
    tableCell: {
      padding: '0.75rem',
      verticalAlign: 'top',
    },
    actionButton: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: 'none',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginRight: '0.5rem',
    },
    approveButton: {
      backgroundColor: '#2ecc71',
    },
    rejectButton: {
      backgroundColor: '#e74c3c',
    },
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
            <Link to="/admin" style={styles.navLink}>Admin Panel</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.navLink}>About</Link>
          </li>
          
        </ul>
      </nav>

      <div style={styles.section}>
        <div style={styles.panelHeader}>
          <h1 style={styles.panelTitle}>Admin Panel</h1>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>

        {/* Pending Leave Applications */}
        <h2 style={styles.sectionTitle}>Pending Leave Applications</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>User</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Leave Type</th>
              <th style={styles.tableHeader}>Start Date</th>
              <th style={styles.tableHeader}>End Date</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.filter(app => app.status === 'pending').map(app => (
              <tr key={app._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{app.userId?.username || 'Unknown'}</td>
                <td style={styles.tableCell}>{app.userId?.email || 'Unknown'}</td>
                <td style={styles.tableCell}>{app.leaveType}</td>
                <td style={styles.tableCell}>{new Date(app.startDate).toDateString()}</td>
                <td style={styles.tableCell}>{new Date(app.endDate).toDateString()}</td>
                <td style={styles.tableCell}>{app.status}</td>
                <td style={styles.tableCell}>
                  <button 
                    onClick={() => handleApproval(app._id)}
                    style={{ ...styles.actionButton, ...styles.approveButton }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleRejection(app._id)}
                    style={{ ...styles.actionButton, ...styles.rejectButton }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Granted Leave */}
        <h2 style={styles.sectionTitle}>Granted Leave</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>User</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Leave Type</th>
              <th style={styles.tableHeader}>Start Date</th>
              <th style={styles.tableHeader}>End Date</th>
              <th style={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {grantedApplications.map(app => (
              <tr key={app._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{app.userId?.username || 'Unknown'}</td>
                <td style={styles.tableCell}>{app.userId?.email || 'Unknown'}</td>
                <td style={styles.tableCell}>{app.leaveType}</td>
                <td style={styles.tableCell}>{new Date(app.startDate).toDateString()}</td>
                <td style={styles.tableCell}>{new Date(app.endDate).toDateString()}</td>
                <td style={styles.tableCell}>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Rejected Leave */}
        <h2 style={styles.sectionTitle}>Rejected Leave</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>User</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Leave Type</th>
              <th style={styles.tableHeader}>Start Date</th>
              <th style={styles.tableHeader}>End Date</th>
              <th style={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rejectedApplications.map(app => (
              <tr key={app._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{app.userId?.username || 'Unknown'}</td>
                <td style={styles.tableCell}>{app.userId?.email || 'Unknown'}</td>
                <td style={styles.tableCell}>{app.leaveType}</td>
                <td style={styles.tableCell}>{new Date(app.startDate).toDateString()}</td>
                <td style={styles.tableCell}>{new Date(app.endDate).toDateString()}</td>
                <td style={styles.tableCell}>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
