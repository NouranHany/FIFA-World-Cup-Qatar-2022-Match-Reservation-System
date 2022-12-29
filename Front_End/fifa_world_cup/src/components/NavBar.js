import React , {useContext , useState , useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import styles from "./NavBarStyles.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn , faUserPlus , faUser , faHome , faSignOut  , faFutbol} from "@fortawesome/free-solid-svg-icons";
import { User } from "../App";
function NavBar() {

  const UserContext = useContext(User);
  const [loggedIn , setLoggedIn] = UserContext.loggedIn;
  const logOut = function(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    UserContext.user[1]({});
    UserContext.token[1]("");

  }


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
            <Link to="/matches">
              <FontAwesomeIcon icon={faFutbol} style={{marginRight:"5px"}} />
              Matches
              </Link>
          </li>
          {
            // if user logged in show profile and logout
            // else show login and signup
            // get logged in from the provider
            loggedIn? (
              <>
                <li className={styles.listItem}>
                  <Link to="/profile">
                    <FontAwesomeIcon icon={faUser} style={{marginRight:"5px"}} />
                    Profile
                  </Link>
                </li>
                <li className={styles.listItem} onClick={logOut}>
                  <Link to="/">
                    <FontAwesomeIcon  icon={faSignOut} style={{marginRight:"5px"}} />
                    Logout  
                  </Link>

                </li>

              </>
            ) : (
              <>
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
              </>
            )
          }
        </ul>
    </nav>
  );
}

export default NavBar;
