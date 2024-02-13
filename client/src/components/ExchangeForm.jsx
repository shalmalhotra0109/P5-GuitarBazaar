import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ExchangeForm = ({wantGuitar}) => {
    const [show, setShow] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userGuitars, setUserGuitars] = useState([]) 
  const [selectedGuitar, setSelectedGuitar] = useState('');

  const handleChange = (event) => {
    setSelectedGuitar(event.target.value);
  };
  useEffect(() => {
    // Fetch the user's user guitars from the database
    fetch(`http://127.0.0.1:5000/guitar/${storedUser.id}`)
      .then(response => response.json())
      .then(data => {
        setUserGuitars(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching user guitars:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    const exhangeQuery={
        owned_guitar_id = selectedGuitar
        offer_guitar_id = wantGuitar.id
    }

  }
  
  return (
    <>
    <Button variant="info" onClick={()=>handleShow()}>
    Make Exchange
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Guitar Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label>exchange</label>
            <select value={selectedGuitar} onChange={handleChange}>
            <option value="">Select a Guitar</option>
            {userGuitars.map((guitar) => (
                <option key={guitar.id} value={guitar.id}>
                {guitar.model}
                </option>
            ))}
            </select>
          <label> for the {wantGuitar.model}</label>
          <button type="submit">Submit Guitar</button>
          </form>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ExchangeForm
