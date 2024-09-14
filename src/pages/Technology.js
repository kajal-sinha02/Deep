import React from 'react';
import Navbar from './Navbar';
import mernLogo from '../assets/mern.webp'; // Update with your actual path
// Update with your actual path
import mlLogo from '../assets/kaggle.png'; // Update with your actual path

const Technology = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f7f9ff',
      minHeight: '80vh',
    },
    logoContainer: {
        display: 'flex',
        height  : '60px',
        
        gap: '30px', // Adjust space between logos if needed
        marginTop: '10px',
      },
    leftSection: {
      flex: 1,
      padding: '20px',
      zIndex: 2,
    },
    rightSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      width: '90%',
      height: '100vh',
    },
    videoBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '80%',
      height: '80%',
      objectFit: 'cover',
      zIndex: 1,
    },
    heading: {
      fontSize: '50px',
      color: '#2b3d80',
      marginBottom: '10px',
    },
    headingg: {
      fontSize: '40px',
      color: '#2b3d80',
      marginBottom: '10px',  // Reduced marginBottom to move it up
      marginTop: '0px',      // Set marginTop to 0 to ensure it's aligned correctly
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
          <h2 style={styles.heading}>Behind the Scenes :</h2>
          <h5 style={styles.headingg}>Tech Stack breakdown</h5>
          <p style={styles.subHeading}>
  MERN Stack, React Native, Machine Learning: One Byte at a Time
</p>
<div style={styles.logoContainer}>
            <img src={mernLogo} alt="MERN Stack" style={styles.logo} />
           
            <img src={mlLogo} alt="Machine Learning" style={styles.logo} />
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

export default Technology;
