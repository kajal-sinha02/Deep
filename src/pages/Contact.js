import React from 'react'
import Navbar from './Navbar'
import './ContactForm.css'
const Contact = () => {
    const styles = {
        heading: {
          fontFamily: "'Roboto', sans-serif", // Make sure to import this font if using
          fontSize: '36px',
          fontWeight: '700', // Bold
          color: 'transparent', // Make the text color transparent for gradient effect
          background: 'linear-gradient(45deg, #8e2de2, #4a00e0)', // Purple to Blue gradient
          backgroundClip: 'text', // Clip the gradient to the text
          WebkitBackgroundClip: 'text', // For WebKit browsers (Chrome, Safari)
          marginBottom: '20px',
          textAlign: 'center',
        },
      };
      
      
    
      
  return (
    <>
    <Navbar></Navbar>
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-form">
        <h2 style={styles.heading}>Get in touch</h2>

          <p>Reach out and let the magic of AI detection illuminate our skies. Contact us to explore how we can safeguard your digital world.
          </p>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Last Name" name="lastName" required />
              <input type="text" placeholder="First Name" name="firstName" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" name="email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Phone Number" name="phoneNumber" />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" name="message" rows="4"></textarea>
            </div>
            <button type="submit">Contact us</button>
          </form>
        </div>
        <div className="contact-image">
        <div style={{height : "10 px"}}></div>
        <blockquote>
            
              For inquiries, reach out to us at:<br />
              <strong>Email:</strong> contact@fakedetection.ai<br />
              <strong>Phone:</strong> +1-234-567-8901
            </blockquote>
          <img src="https://img.freepik.com/premium-photo/contact-us-business-icon-computer-keyboard-with-globe_117856-2468.jpg" alt="Astronaut" />
        
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact
