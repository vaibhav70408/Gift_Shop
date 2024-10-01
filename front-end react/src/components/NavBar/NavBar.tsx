import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './NavBar.module.scss';
import React from 'react';

const NavBarComp = () => {
  const location = useLocation();

  const checkIsActive = (url: string) => {
    return location.pathname === url;
  }

  return (
    <Navbar className={styles.navBarComponent} bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/app/home" active={checkIsActive("/app/home")}>Home</Nav.Link>
          <Nav.Link href="/app/order" active={checkIsActive("/app/order")}>Orders</Nav.Link>
          <Nav.Link href="/app/gifts" active={checkIsActive("/app/gifts")}>Gifts</Nav.Link>
          <Nav.Link href="/app/theme" active={checkIsActive("/app/theme")}>Theme</Nav.Link>
          <Nav.Link href="/app/myorders" active={checkIsActive("/app/myorders")}>My Orders</Nav.Link>
          <Nav.Link id="logout-button" className={styles.logoutButton} href="/app/logout" active={checkIsActive("/app/logout")}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarComp;