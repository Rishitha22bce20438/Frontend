import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

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
    button: {
      background: 'none',
      border: 'none',
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      padding: 0,
    },
    content: {
      marginBottom: '2rem',
    },
    title: {
      color: '#2c3e50',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    paragraph: {
      marginBottom: '1rem',
      lineHeight: '1.6',
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.appHeader}>Leave Management System</h1>
      </header>

      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/dashboard" style={styles.navLink}>
              Home
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/apply-leave" style={styles.navLink}>
              Apply Leave
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.navLink}>
              About
            </Link>
          </li>
          <li style={styles.navItem}>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.title}>About Us</h1>
        <p style={styles.paragraph}>
          Welcome to our application! We provide a streamlined and efficient way to manage and apply for leave. Our goal is to simplify the leave application process and provide a user-friendly
          experience for both employees and administrators.
        </p>
        <p style={styles.paragraph}>
          If you have any questions or feedback, please feel free to reach out to us at{' '}
          <a href="mailto:support@example.com" style={styles.link}>
            support@example.com
          </a>
          .
        </p>
        <p style={styles.paragraph}>Thank you for using our application!</p>
      </div>
    </div>
  )
}

export default About
