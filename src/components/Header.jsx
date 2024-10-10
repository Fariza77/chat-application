import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;