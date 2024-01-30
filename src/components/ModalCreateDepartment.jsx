import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { IoPerson } from "react-icons/io5";
import CreateDepartment from './CreateDepartment';

const ModalCreateDepartment = ({onClose, showModalCreateDepartment, setShowModalCreateDepartment}) => {

  const [nameDepartment, setNameDepartment] = useState('');
  const [descriptionDepartment, setDescriptionDepartment] = useState('');

  
  
  const handleSubmit = () => {
    CreateDepartment({
      nameDepartment:  nameDepartment,
      descriptionDepartment: descriptionDepartment,
      onClose: onClose,
      setShowModalCreateDepartment: setShowModalCreateDepartment
    })
  }

  return(
    <>
      <Modal show={showModalCreateDepartment} onHide={() => setShowModalCreateDepartment(false)} size='md' style={{color: "black"}}>
        <Modal.Header closeButton>
          <Modal.Title>
          <IoPerson style={{color: "black", marginRight: "3px"}}/>
            Create department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <span style={{color: 'red'}}>*</span>
                <label>Name</label>
                <input type='text' placeholder='Name...' id="name_department" className="form-control" onChange={(e) => setNameDepartment(e.target.value)} required/>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <span style={{color: 'red'}}>*</span>
                <label>Decription</label>
                <input type='text' placeholder='Description...' id="description_department" className="form-control" onChange={(e) => setDescriptionDepartment(e.target.value)} required/>
              </Col>
            </Row>

            <Modal.Footer>
              <Button variant="danger" onClick={() => setShowModalCreateDepartment(false)}>
                Close
              </Button>
              <Button variant="success" type='submit' onSubmit={handleSubmit}>
                Create
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreateDepartment;