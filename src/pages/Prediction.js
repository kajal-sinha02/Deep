import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

// Modal Component for Reporting
function ReportModal({ showModal, setShowModal, handleSubmit }) {
  const [link, setLink] = useState('');

  const handleLinkChange = (e) => setLink(e.target.value);
  const handleModalSubmit = () => {
    handleSubmit(link);
    setShowModal(false);
  };
  const closeModal = () => setShowModal(false);

  if (!showModal) return null;

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      width: '400px',
      boxSizing: 'border-box',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#b00020',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      marginRight: '10px',
    },
    cancelButton: {
      backgroundColor: '#ccc',
    },
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Report Video</h2>
        <input
          type="text"
          placeholder="Enter video link"
          value={link}
          onChange={handleLinkChange}
          style={modalStyles.input}
        />
        <button style={modalStyles.button} onClick={handleModalSubmit}>
          Submit Report
        </button>
        <button style={{ ...modalStyles.button, ...modalStyles.cancelButton }} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user');
    setUserId(storedUserId);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      setPredictionResult(null);
    }
  };

  const prediction = async (file) => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.prediction;
    } catch (error) {
      console.error('Error predicting video:', error);
      throw new Error('Error predicting video');
    }
  };

  const handlePredict = async () => {
    if (!videoFile) {
      alert('Please upload a video file before predicting.');
      return;
    }

    setLoading(true);

    try {
      const result = await prediction(videoFile);
      setPredictionResult(result);
    } catch (error) {
      alert('There was an error making the prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReportSubmit = async (link) => {
    if (!link) {
      alert('Please provide a valid link.');
      return;
    }

    try {
      await axios.post('https://faceapi-two.vercel.app/data/addreport', {
        userId : localStorage.getItem('userId'),
        link,
      });
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Error reporting video:', error);
      alert('There was an error submitting the report. Please try again.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh',
      backgroundColor: '#f7f9ff',
      padding: '20px',
      boxSizing: 'border-box',
    },
    innerContainer: {
      backgroundColor: '#f7f9ff',
      padding: '40px',
      borderRadius: '10px',
      border: '2px solid black',
      textAlign: 'center',
      maxWidth: '600px',
      width: '100%',
      marginTop: '9px',
    },
    title: {
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2b3d80',
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: loading ? '#ccc' : 'black',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      margin: '10px',
    },
    reportButton: {
      padding: '12px 24px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#b00020',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      margin: '10px',
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          <h2 style={styles.title}>Fake or Real Video Prediction</h2>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          
          {videoURL && (
            <div style={{ marginTop: '20px' }}>
              <video src={videoURL} controls style={{ width: '100%', maxWidth: '500px', borderRadius: '5px' }} />
            </div>
          )}

          <button onClick={handlePredict} style={styles.button} disabled={loading}>
            {loading ? 'Predicting...' : 'Predict'}
          </button>
          
          {predictionResult && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p>
                Prediction Result: {predictionResult === 'FAKE' ? 'The video is FAKE.' : 'The video is REAL.'}
              </p>
              {predictionResult === 'FAKE' && (
                <button
                  style={styles.reportButton}
                  onClick={() => setShowModal(true)}
                >
                  Report Video
                </button>
              )}
            </div>
          )}
        </div>

        <ReportModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleReportSubmit}
        />
      </div>
    </>
  );
}

export default App;
