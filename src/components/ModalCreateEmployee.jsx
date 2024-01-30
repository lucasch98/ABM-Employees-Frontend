import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../styles/FormCreateEmployee.css"
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import CreateEmployee from './CreateEmployee';

const endpointDeparments = 'https://abm-employees-backend-production.up.railway.app/api'; 

const ModalCreateEmployee = ({showModal, onClose}) => {

  const [departments, setDepartments] = useState([])
  const [name, setName] = useState('');
  const [last_name, setLast_Name] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [position_job, setPosition_Job] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [birth_date, setBirth_Date] = useState('');

  useEffect(() => {
    getDepartments()
  }, [])

  const handleSubmit = () => {  
    CreateEmployee({
        name_Employee: name,
        last_name_Employee: last_name,
        dni_Employee: dni,
        phone_Employee: phone,
        position_job_Employee: position_job,
        department_Employee: department,
        email_Employee: email,
        birth_date_Employee: birth_date,
        onClose: onClose,
      }
    )
  }

  const getDepartments = async () => {
    try{
      const resp = await fetch(`${endpointDeparments}/departments`);
      if (!resp.ok) {
        throw new Error(`Error al cargar los datos de la API: ${resp.status}`);
      }
      const data = await resp.json();
      setDepartments(data)
    }catch(error){
      console.log("Ocurrio un error al llamar a la API" + error);
    }
  }

  const handleCloseModal = () => {
    if(window.confirm('Seguro que desea cancelar? Si acepta se borran todos los datos ingresados')){
      onClose();
    }
  }
  return(
    <>
      <Modal show={showModal} onHide={onClose} size='lg' animation={false} style={{color: "black"}}>
        <Modal.Header closeButton>
          <Modal.Title>
            <IoPerson style={{color: "black", marginRight: "3px"}}/>
            Create employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <span style={{color: "red"}}>*</span>
                <label>Name</label>
                <input type="text" id="name_employee" onChange={(e) => setName(e.target.value)} className="form-control" required/>
              </Col>

              <Col>
                <span style={{color: "red"}}>*</span>
                <label htmlFor="nombre">Last name</label>
                <input type="text" id="last_name_employee" onChange={(e) => setLast_Name(e.target.value)}  className="form-control" required/>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <span style={{color: "red"}}>*</span>
                <label htmlFor="nombre">Dni</label>
                <input type="number" id="dni_employee" onChange={(e) => setDni(e.target.value)} className="form-control" required placeholder='41345670' />
              </Col>

              <Col>
                <span style={{color: "red"}}>*</span>
                <label htmlFor="nombre">Phone</label>
                <input type="number" id="phone_employee" onChange={(e) => setPhone(e.target.value)} className="form-control" required placeholder='2914356789'/>
              </Col>
            </Row>
              
            <Row className="mb-3">
              <Col>
                <span style={{color: "red"}}>*</span>
                <label htmlFor="nombre">Position job</label>
                <input type="text" id="position_job" onChange={(e) => setPosition_Job(e.target.value)} className="form-control" required/>
              </Col>

              <Col>
                <span style={{color: "red"}}>*</span>
                <label htmlFor="nombre">Birth date</label>
                <input type="text" id="birth_date" onChange={(e) => setBirth_Date(e.target.value)} className="form-control" required placeholder='1997-12-05'/>
              </Col>
            </Row>
              
            <Row className="mb-3">
            <Col>
                <span style={{color: "red"}}>*</span>
                <label htmlFor="nombre">Email</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="form-control" required placeholder='example@gmail.com'/>
              </Col>
                
              <Col>
                <span style={{color: "red"}}>*</span>
                <label htmlFor="nombre">Department</label>
                <Form.Select 
                  aria-label="Default select example"
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                  required
                >
                  <option value="" disabled>Select department</option>
                  {
                    departments && (
                      departments.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.name}
                        </option>
                      )))
                  }
                </Form.Select>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="danger" type="button" style={{color:"white"}} onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="success" type="submit" style={{color:"white"}} onSubmit={handleSubmit}>
                Create
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreateEmployee;