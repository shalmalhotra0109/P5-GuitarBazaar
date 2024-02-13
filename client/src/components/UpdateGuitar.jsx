import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UpdateGuitar({guitarData}) {
  const [show, setShow] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [guitar, setGuitar] = useState({
    user_id: storedUser.id,
    brand: guitarData.brand,
    model: guitarData.model,
    material: guitarData.material,
    description: guitarData.description,
    accept_bids: guitarData.accept_bids,
    accept_exchange: guitarData.accept_exchange,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setGuitar(prevGuitar => ({
      ...prevGuitar,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/guitar/${guitarData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guitar),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Guitar created successfully:', data);
      // Here you might want to clear the form or give some feedback to the user
    } catch (error) {
      console.error('Error creating guitar:', error);
      // Handle the error (e.g., show an error message)
    }
  };


  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Guitar Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="brand"
                value={guitar.brand}
                onChange={handleChange}
                placeholder="Brand"
            />
            <input
                type="text"
                name="model"
                value={guitar.model}
                onChange={handleChange}
                placeholder="Model"
            />
            <input
                type="text"
                name="material"
                value={guitar.material}
                onChange={handleChange}
                placeholder="Material"
            />
            <textarea
                name="description"
                value={guitar.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <label>
                Accept Bids:
                <input
                type="checkbox"
                name="accept_bids"
                checked={guitar.accept_bids}
                onChange={handleChange}
                />
            </label>
            <label>
                Accept Exchange:
                <input
                type="checkbox"
                name="accept_exchange"
                checked={guitar.accept_exchange}
                onChange={handleChange}
                />
            </label>
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
  );
}

export default UpdateGuitar;