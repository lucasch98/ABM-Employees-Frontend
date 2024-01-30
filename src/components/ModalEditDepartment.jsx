import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoPerson } from "react-icons/io5";
import EditDepartment from './EditDepartment';
import { Row, Col } from 'react-bootstrap';

const ENDPOINT_SHOW_DEPARTMENT = 'https://abm-employees-backend-production.up.railway.app/api/department';

const ModalEditDepartment = ({onClose ,showModalEditDepartment, setShowModalEditDepartment, id_Department}) => {

  const [department,  setDepartment] = useState({
    name: '', 
    description: ''
  });

  useEffect(() => {
    getDataDepartment(id_Department)
  },[])

  const getDataDepartment = async (id_Department) => {
    try {
      const resp = await fetch(`${ENDPOINT_SHOW_DEPARTMENT}/${id_Department}`);
      if(!resp.ok) {
        throw new Error("Error to bring data department")
      }
      const data = await resp.json();
      setDepartment(data)
    } catch (error) {
      console.log("Error al traer los datos de la API", error);
    }
  }

  const handleSubmit = () => {
    EditDepartment({
      nameDepartment: department.name,
      descriptionDepartment: department.description,
      id_Department: id_Department,
      onClose: onClose,
      setShowModalEdit: setShowModalEditDepartment
    })
  }
  
  return(
    <>
      <Modal show={showModalEditDepartment} onHide={() => setShowModalEditDepartment(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: 'black'}}>
          <IoPerson style={{color: "black", marginRight: "3px"}}/>
           Edit department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Col>
                <span style={{color: 'red'}}>*</span>
                <label style={{color: 'black'}}>Name</label>
                <input type='text' id='name-department-edit' value={department.name} 
                       className='form-control' onChange={(e) => setDepartment({
                        ...department,
                        name: e.target.value,
                       })}
                       required
                />    
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <span style={{color: 'red'}}>*</span>
                <label style={{color: 'black'}}>Description</label>
                <input type='text' id='description-department-edit' value={department.description} 
                       className='form-control' onChange={(e) => setDepartment({
                        ...department,
                        description: e.target.value
                       })}
                       required
                />
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="danger" onClick={() => setShowModalEditDepartment(false)}>
                Close
              </Button>
              <Button variant="success" type='submit' onSubmit={handleSubmit}>
               Save changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalEditDepartment;