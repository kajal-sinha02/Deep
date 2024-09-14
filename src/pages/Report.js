import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Retrieve userId from localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }

        // Make API request using the userId
        const response = await axios.get(`https://faceapi-two.vercel.app/data/report/user/${userId}`);
        setReports(response.data.reports);
      } catch (error) {
        // Set error message if API request fails or userId is missing
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1>My Reports</h1>
        {reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          <ul style={styles.reportList}>
            {reports.map((report) => (
              <li key={report._id} style={styles.reportItem}>
                <p><strong>Link:</strong> {report.link}</p>
                <p><strong>Status:</strong> {report.status}</p>
                <p><strong>Created At:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f7f9ff',
    borderRadius: '8px',
    // border: '1px solid #ddd',
  },
  reportList: {
    listStyleType: 'none',
    padding: '0',
  },
  reportItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default MyReports;
