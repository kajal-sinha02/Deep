import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import image from "../assets/logo.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/main");
  };

  const handleLoginClick = () => {
    handleLogin(); // Call the handleLogin function from context
    navigate("/login"); // Redirect to the login page
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call the handleLogout function from context
    navigate("/main"); // Redirect to the main page
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "97%",
      height: "90px",
      padding: "10px 20px",
      backgroundColor: "#f7f9ff",
      position: "sticky",
      top: "0",
      zIndex: "1000",
    },
    navbarLogo: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    logo: {
      height: "100px",
      marginRight: "8px",
    },
    brandName: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "#2b3d80",
    },
    navbarLinks: {
      display: "flex",
      listStyle: "none",
      margin: "0",
      padding: "0",
    },
    navbarLinkItem: {
      margin: "0 15px",
      position: "relative",
    },
    navbarLink: {
      textDecoration: "none",
      color: "#2b3d80",
      fontSize: "20px",
      transition: "color 0.3s",
    },
    dropdownArrow: {
      fontSize: "12px",
    },
    dropdownMenu: {
      display: dropdownOpen ? "block" : "none",
      position: "absolute",
      top: "100%",
      left: "0",
      backgroundColor: "#f7f9ff",
      borderRadius: "5px",
      width: "200px",
      zIndex: "1000",
      padding: "10px",
    },
    dropdownItem: {
      padding: "10px",
      textDecoration: "none",
      color: "#2b3d80",
      display: "block",
      fontSize: "16px",
      transition: "background-color 0.3s",
    },
    dropdownItemHover: {
      backgroundColor: "#f0f0f0",
    },
    navbarButtons: {
      display: "flex",
      alignItems: "center",
    },
    getStartedButton: {
      backgroundColor: "#3a42ff",
      color: "white",
      fontSize: "18px",
      border: "none",
      height: "50px",
      padding: "8px 16px",
      borderRadius: "20px",
      cursor: "pointer",
      marginRight: "18px",
      transition: "background-color 0.3s",
    },
    loginLink: {
      textDecoration: "none",
      color: "#2b3d80",
      fontSize: "20px",
      cursor: "pointer",
      transition: "color 0.3s",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarLogo} onClick={handleLogoClick}>
        <img src={image} alt="FaceX" style={styles.logo} />
        <span style={styles.brandName}>FaceX</span>
      </div>
      <ul style={styles.navbarLinks}>
        <li style={styles.navbarLinkItem}>
          <Link to="/main" style={styles.navbarLink}>
            Why FaceX
          </Link>
        </li>
        <li
          style={styles.navbarLinkItem}
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          {/* <a href="#solutions" style={styles.navbarLink}>
            Solutions <span style={styles.dropdownArrow}>▼</span>
          </a>
          <div style={styles.dropdownMenu}>
            <Link
              to="/predict"
              style={styles.dropdownItem}
            >
              Video Prediction
            </Link>
          </div> */}
        </li>
        <li style={styles.navbarLinkItem}>
          <Link to="/predict" style={styles.navbarLink}>
            Video Prediction <span style={styles.dropdownArrow}></span>
          </Link>
        </li>

        <li style={styles.navbarLinkItem}>
  <a href="/report" style={styles.navbarLink}>
    My Report <span style={styles.dropdownArrow}></span>
  </a>
</li>


        <li style={styles.navbarLinkItem}>
          <Link to="/tech" style={styles.navbarLink}>
            Technology <span style={styles.dropdownArrow}></span>
          </Link>
        </li>
        <li style={styles.navbarLinkItem}>
          <a href="#resources" style={styles.navbarLink}>
            Resources <span style={styles.dropdownArrow}></span>
          </a>
        </li>
      </ul>
      <div style={styles.navbarButtons}>
        <Link to="/predict" style={{ textDecoration: 'none' }}>
          <button style={styles.getStartedButton}>Get Started</button>
        </Link>
        {isLoggedIn ? (
          <span style={styles.loginLink} onClick={handleLogoutClick}>
            Log Out
          </span>
        ) : (
          <span style={styles.loginLink} onClick={handleLoginClick}>
            Log In
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
