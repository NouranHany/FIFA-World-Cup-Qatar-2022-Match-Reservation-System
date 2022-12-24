import React from "react";
import styles from "./NavBarStyles.module.css";
function NavBar() {
  return (
    <nav className={styles.navContainer}>
      <img className={styles.logo} src="https://digitalhub.fifa.com/transform/3a170b69-b0b5-4d0c-bca0-85880a60ea1a/World-Cup-logo-landscape-on-dark?io=transform:fill&quality=75" alt="" />
        <ul className={styles.links}>
          <li className={styles.listItem}>
            <a href="#services">Services</a>
          </li>
          <li className={styles.listItem}>
            <a href="#portolio">Portolio</a>
          </li>
          <li className={styles.listItem}>
            <a href="#about">About</a>
          </li>
          <li className={styles.listItem}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
    </nav>
  );
}

export default NavBar;
