import { useContext, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { MdLogout } from 'react-icons/md'
import styles from "../../style/Navigation.module.css";
import styled from "styled-components";
import AuthContext from "../../Context/auth";

const NavLinkStyle = styled.div`
  .navLink {
    text-decoration: none;
    margin-left: 20px;
    color: white;
    font-weight: bold;
    font-size: 22px;
    padding: 5px 15px;
    border-radius: 10px;
  }
  .navLink:hover {
    color: #b3c4ff;
  }

  .active {
    color: #fadc22;
  }
`;

const NavigationBar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [hideLogout, setHideLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setUser(null);
  };

  return (
    <div className={styles.mainNav}>
      <div className={styles.navControls}>
        <NavLink to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/61/Xilam_-_Logo.png"
            alt="Logo"
            className={styles.logoImg}
          />
        </NavLink>
        <NavLinkStyle className="ms-5">
          <Nav className="">
            <NavLink to="/" className="navLink">
              Home
            </NavLink>
            <NavLink to="/movies" className="navLink">
              Movies
            </NavLink>
            <NavLink to="/tvseries" className="navLink">
              TV Series
            </NavLink>
          </Nav>
        </NavLinkStyle>
      </div>
      <div className="me-5">
        {user ? (
          <div
            className={styles.userInfo}
            onClick={() => setHideLogout(!hideLogout)}
          >
            <img
              src={user.picture}
              alt="avatar_user"
              className={styles.avatarUser}
            />
            <div className={styles.nameUser}>{user.name}</div>
            {hideLogout && <div onClick={handleLogout}><MdLogout size={24} /></div>}
          </div>
        ) : (
          <Link to={"/login"} className={styles.btnNav}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
