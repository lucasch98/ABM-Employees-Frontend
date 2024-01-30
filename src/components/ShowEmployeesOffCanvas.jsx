import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineMailOutline } from "react-icons/md";
import Badge  from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import '../styles/ShowEmployeesOffCanvas.css';

const ENDPOINT_SHOW_EMPLOYEES_ASSOCIATED = 'https://abm-employees-backend-production.up.railway.app/api/department';

const ShowEmployeesOffCanvas = ({id_Department , showOffCanvasEmployees, setOffCanvasEmployees}) => {

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [showSearch, setShowSearh] = useState(true);
  const [employeesAux, setEmployeeAux] = useState([]);

  useEffect(() => {
    if(searchTerm!== "") {
      setTimeout(() => {
        setLoadingEmployees(false)
        getEmployees(id_Department, searchTerm)
      }, 10)
    }else{
      if(employeesAux.length ===0) {
        setLoadingEmployees(true)
        getEmployees(id_Department, searchTerm)
      }
    }
  }, [searchTerm])
  

  
  const getEmployees = async (id_Department, searchTerm) => {
    try{
      const resp = await fetch(`${ENDPOINT_SHOW_EMPLOYEES_ASSOCIATED}/${id_Department}/employees`);
      const data = await resp.json();

      if(searchTerm && searchTerm.trim() !== '') {
        const filterEmployee = data.filter((employee) => {
          return(
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
        
        setLoadingEmployees(false);
        setEmployees(filterEmployee);
      }else{
        if(data.length !== 0 && searchTerm === ''){
          if(employeesAux.length === 0){
            setEmployeeAux(data);
          }else{
            setEmployees(data)
          }
        }else{
          setShowSearh(false);
          setEmployees([]);
        }
        setLoadingEmployees(false);
      }
      
    }catch(error){
      console.log("Error to bring employees associated", error);
      setLoadingEmployees(false);
    }
  }

  const handleEmployeeClick = (id_Employee) => {
    setSelectedEmployeeID(id_Employee);
  }

  return(
    <>
      <Offcanvas show={showOffCanvasEmployees} onHide={() => setOffCanvasEmployees(false)} style={{backgroundColor: '#242424'}}>
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title style={{color: '#E6A60A'}}>Employees associated</Offcanvas.Title>
        </Offcanvas.Header>
        {
          employeesAux.length !== 0 && !loadingEmployees  && ( 
            <Form>
              <Form.Control 
                type="search"
                placeholder="🔍 Name..."
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                className='search-input'
                style={{backgroundColor: '#151515', color: 'white', width: '50%', marginLeft: '4%', '::placeholder': { color: 'white' }}}
                />
            </Form>
          )
        }
        <Offcanvas.Body>
        {
            searchTerm === "" && employeesAux.length !== 0 && !loadingEmployees && (
              employeesAux.map((employee) => (
                <Accordion style={{color: ''}} key={employee.id}>
                  <Accordion.Item eventKey={employee.id} style={{marginTop: '3%'}} >
                    <Accordion.Header onClick={() => handleEmployeeClick(employee.id)}>{employee.name}</Accordion.Header>
                      <Accordion.Body style={{color: 'white', backgroundColor: '#242424'}}>
                        {
                          selectedEmployeeID === employee.id && (
                            <ul>
                              <li>
                                <IoPersonOutline /> &nbsp;
                                {employee.name}
                              </li>
                              <li>
                                <IoPersonOutline /> &nbsp;
                                {employee.last_name}
                              </li>
                              <li>
                              <HiOutlineIdentification /> &nbsp;
                              <Badge pill bg="white" style={{color: 'black'}}>
                                {employee.dni}
                              </Badge>
                              </li>
                              <li>
                              <MdOutlineMailOutline /> &nbsp;
                                {employee.email}
                              </li>
                            </ul>
                          )
                        }
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
              ))
            )
          }   

          {
            searchTerm!== "" && employees.length !== 0 && !loadingEmployees && (
              employees.map((employee) => (
                <Accordion style={{color: ''}} key={employee.id}>
                  <Accordion.Item eventKey={employee.id} style={{marginTop: '3%'}} >
                    <Accordion.Header onClick={() => handleEmployeeClick(employee.id)}>{employee.name}</Accordion.Header>
                      <Accordion.Body style={{color: 'white', backgroundColor: '#242424'}}>
                        {
                          selectedEmployeeID === employee.id && (
                            <ul>
                              <li>
                                <IoPersonOutline /> &nbsp;
                                {employee.name}
                              </li>
                              <li>
                                <IoPersonOutline /> &nbsp;
                                {employee.last_name}
                              </li>
                              <li>
                              <HiOutlineIdentification /> &nbsp;
                              <Badge pill bg="white" style={{color: 'black'}}>
                                {employee.dni}
                              </Badge>
                              </li>
                              <li>
                              <MdOutlineMailOutline /> &nbsp;
                                {employee.email}
                              </li>
                            </ul>
                          )
                        }
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
              ))
            )
          }
      
          {
            ((employees.length === 0 && searchTerm) || (employeesAux.length === 0 && !searchTerm)) && !loadingEmployees && (
              <div style={{ width: '300px', textAlign: 'center' }}>
                <Alert key={'danger'} variant={'danger'}>
                  ¡Could not find associated employees!
                </Alert>
              </div>
            )
          }
          {
            loadingEmployees && (
              <div style={{ textAlign: 'center' }}>
                <Spinner animation="border" variant="warning" />
              </div>
            )
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default ShowEmployeesOffCanvas;