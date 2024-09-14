import React, { useEffect  } from 'react';
import { useNavigate  , Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Navbar from './Navbar';

const DeepfakeDetection = () => {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  const navigate = useNavigate();

  // Redirect if logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

  const handleContactClick = () => {
    navigate('/contact'); // Navigate to the Contact page
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f7f9ff',
      minHeight: '80vh',
    },
    leftSection: {
      flex: 1,
      padding: '20px',
      zIndex: 2, // Ensures it's above the video background
    },
    rightSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      width: '90%', // Ensure it takes the full width
      height: '100vh', // Takes the full height of the viewport
    },
    videoBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '90%',
      height: '90%',
      objectFit: 'cover',
      zIndex: 1, // Below other content
    },
    heading: {
      fontSize: '50px',
      color: '#2b3d80',
      marginBottom: '20px',
    },
    subHeading: {
      fontSize: '20px',
      color: '#2b3d80',
      marginBottom: '20px',
    },
    buttonsContainer: {
      display: 'flex',
      gap: '15px',
    },
    getStartedButton: {
      backgroundColor: '#3a42ff',
      color: 'white',
      fontSize: '18px',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '20px',
      cursor: 'pointer',
    },
    contactButton: {
      backgroundColor: 'transparent',
      color: '#3a42ff',
      fontSize: '18px',
      border: '1px solid #3a42ff',
      padding: '10px 20px',
      borderRadius: '20px',
      cursor: 'pointer',
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <h1 style={styles.heading}>All-In-One Deepfake Detection</h1>
          <p style={styles.subHeading}>
            AI-powered deepfake detection for videos. A single solution for multiple use cases.
          </p>
          <div style={styles.buttonsContainer}>
            {isLoggedIn ? (
              <button
                style={styles.getStartedButton}
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <Link to="/predict" style={{ textDecoration: 'none' }}>
              <button style={styles.getStartedButton}>Get Started</button>
            </Link>
            )}
           <button style={styles.contactButton} onClick={handleContactClick}>
              Contact Us
            </button>
          </div>
        </div>
        <div style={styles.rightSection}>
          <video style={styles.videoBackground} autoPlay loop muted>
            <source src="https://sensity.ai/wp-content/uploads/2024/05/hero-home.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
};

export default DeepfakeDetection;
