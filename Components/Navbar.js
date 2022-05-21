import React from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function NavbarComponent() {
  const { data: session } = useSession();

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        fixed="top"
        style={{ backgroundColor: "black" }}
      >
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>E-Commerce</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/products" passHref>
                <Nav.Link>Products</Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-warning">Search</Button>
            </Form>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {!session && (
              <div style={{ margin: 10 }}>
                <Button onClick={() => signIn()} variant="outline-warning">
                  Sign In
                </Button>
              </div>
            )}
            {session && (
              <div style={{ margin: 10 }}>
                <Button onClick={() => signOut()} variant="outline-danger">
                  Log Out
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
