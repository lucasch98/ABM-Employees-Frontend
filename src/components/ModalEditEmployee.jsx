  import Modal from 'react-bootstrap/Modal';
  import "../styles/FormCreateEmployee.css"
  import { IoPerson } from "react-icons/io5";
  import Button from 'react-bootstrap/Button';
  import EditEmployee from './EditEmployee'
  import Form from 'react-bootstrap/Form';
  import { Row, Col } from 'react-bootstrap';
  import { useEffect, useState } from 'react';
  const ModalEditEmployee = ({idEmployee, showModal, setShowModal, onClose}) => {

    const [departments, setDepartments] = useState([]);
    
    const [employee, setEmployee] = useState({
      name: '',
      last_name:'',
      dni:'',
      phone:'',
      position_job:'',
      department_id:'',
      email: '',
      birth_date:'',
    });

    const endpoint = 'https://abm-employees-backend-production.up.railway.app/api'; 

    useEffect(() => {
      getDepartments()
      getEmployee(idEmployee)
    }, [showModal])

    const getDepartments = async () => {//Esta funcion tiene que estar en app.jsx
      try{
        const resp = await fetch(`${endpoint}/departments`);
        if (!resp.ok) {
          throw new Error(`Error al cargar los datos de la API: ${resp.status}`);
        }
        const data = await resp.json();
        setDepartments(data)
      }catch(error){
        console.log("Ocurrio un error al llamar a la API" + error);
      }
    }

    const getEmployee = async (id) => {
      try {
        const resp = await fetch(`${endpoint}/employee/${id}`);
        if(!resp.ok){
          throw new Error(`Error al obtener los datos de la API: ${resp.status}`);
        }
        const data = await resp.json();
        setEmployee(data);
        }
      catch (error) {
        console.log("Ocurrio un error al llamar a la API" + error);
      }
    }

    const handleCloseModal = () => {
      if(window.confirm('Are you sure you want to cancel? If you accept, the changes will not be saved')){
        setShowModal(false)
        onClose();
      }
    }

    const handleSubmit = () => {  
      EditEmployee({
        id: employee.id,
        name: employee.name,
        last_name: employee.last_name,
        dni: employee.dni,
        email: employee.email,
        phone: employee.phone,
        department_id: employee.department_id,
        position_job: employee.position_job,
        birth_date: employee.birth_date,
        onClose: onClose,
        setShowModal: setShowModal
      });
    }

    const handleChange = (attributeChange, e) => {
      setEmployee((dataOldEmployee) => ({
        ...dataOldEmployee,
        [attributeChange]: e.target.value
      }));
    }

    return(
      <>
        <Modal show={showModal} onHide={() => handleCloseModal()} size='lg' animation={false} style={{color: "black"}}>
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
                  <input type="text" id="name_employee" value={employee.name} onChange={(e) => handleChange("name", e)} className="form-control" required/>
                </Col>

                <Col>
                  <span style={{color: "red"}}>*</span>
                  <label htmlFor="nombre">Last name</label>
                  <input type="text" id="last_name_employee" value={employee.last_name} onChange={(e) => handleChange("last_name", e)}  className="form-control" required/>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <span style={{color: "red"}}>*</span>
                  <label htmlFor="nombre">Dni</label>
                  <input type="number" id="dni_employee" value={employee.dni} onChange={(e) => handleChange("dni", e)} className="form-control" required placeholder='41345670' />
                </Col>

                <Col>
                  <span style={{color: "red"}}>*</span>
                  <label htmlFor="nombre">Phone</label>
                  <input type="number" id="phone_employee" value={employee.phone} onChange={(e) => handleChange("phone", e)} className="form-control" required placeholder='2914356789'/>
                </Col>
              </Row>
                
              <Row className="mb-3">
                <Col>
                  <span style={{color: "red"}}>*</span>
                  <label htmlFor="nombre">Position job</label>
                  <input type="text" id="position_job" value={employee.position_job} onChange={(e) => handleChange("position_job", e)} className="form-control" required/>
                </Col>

                <Col>
                  <span style={{color: "red"}}>*</span>
                  <label htmlFor="nombre">Birth date</label>
                  <input type="text" id="birth_date" value={employee.birth_date} onChange={(e) => handleChange("birth_date", e)} className="form-control" required placeholder='1997-12-05'/>
                </Col>
              </Row>
                
              <Row className="mb-3">
              <Col>
                  <span style={{color: "red"}}>*</span>
                  <label htmlFor="nombre">Email</label>
                  <input type="email" id="email" value={employee.email} onChange={(e) => handleChange("email", e)} className="form-control" required placeholder='example@gmail.com'/>
                </Col>
                  
                <Col>
                  <span style={{color: "red"}}>*</span>
                  <label htmlFor="nombre">Department</label>
                  <Form.Select 
                    aria-label="Default select example"
                    onChange={(e) => handleChange("department_id", e)}
                    value={employee.department_id}
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

  export default ModalEditEmployee;