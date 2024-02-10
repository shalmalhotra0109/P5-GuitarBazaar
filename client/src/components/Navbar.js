import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Navbar() {
  return (
    <Form>
      <Form.Group controlId="searchForm">
        <Form.Control type="text" placeholder="Search guitars..." />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form.Group>
    </Form>
  );
}

export default NavBar;