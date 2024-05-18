import { Navbar } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/breed">
          Breeds
        </Navbar.Link>
        <Navbar.Link as={Link} to="/favorite">
          Favorite
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
