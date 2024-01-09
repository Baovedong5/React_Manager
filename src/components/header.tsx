import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppSelector } from "../redux/hooks";

function Header() {
  const users = useAppSelector((state) => state.user.listUser);
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          Phuong with Redux {users.length}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;