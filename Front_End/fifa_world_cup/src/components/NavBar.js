import React from "react";
import styles from "./NavBarStyles.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn , faUserPlus , faFutbol , faHome } from "@fortawesome/free-solid-svg-icons";
function NavBar() {
  return (
    <nav className={styles.navContainer}>
      <img className={styles.logo} src="https://digitalhub.fifa.com/transform/3a170b69-b0b5-4d0c-bca0-85880a60ea1a/World-Cup-logo-landscape-on-dark?io=transform:fill&quality=75" alt="" />
        <ul className={styles.links}>
          <li className={styles.listItem}>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} style={{marginRight:"5px"}} />
              Home
              </Link>
          </li>
          <li className={styles.listItem}>
          <FontAwesomeIcon icon={faFutbol} style={{marginRight:"5px"}} />
            <Link to="/matches">Matches</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignIn} style={{marginRight:"5px"}} />
               Login
              </Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/signup">
            <FontAwesomeIcon icon={faUserPlus} style={{marginRight:"5px"}} />
              Sign Up
            </Link>
          </li>
        </ul>
    </nav>
  );
}

export default NavBar;
