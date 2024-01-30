import Table from 'react-bootstrap/Table';
import '../styles/TableEmployees.css'
import { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import DeleteEmployee from './DeleteEmployee';
import ModalEditEmployee from './ModalEditEmployee';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const endpoint = 'https://abm-employees-backend-production.up.railway.app/api';
const endpointDepartment = 'https://abm-employees-backend-production.up.railway.app/api/department';

const TableEmployees = ({ refreshTable, setRefreshTable, 
                        refreshEmployees, searchTerm, loading, setLoading,
                      showGif, setShowGif}) => {
  const [employees, setEmployees] = useState([]);
  const [showModalEditEmployee, setModalEditEmployee] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [departmentNames, setDepartmentNames] = useState({});
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [departmentsLoaded, setDepartmentsLoaded] = useState(false);

  useEffect(() => {
    if (!loading && !departmentsLoaded) {
      setLoadingDepartments(true);
      Promise.all(employees.map(employee => getNameDepartment(employee.department_id)))
        .then(results => {
          const names = {};
          employees.forEach((employee, index) => {
            names[employee.department_id] = results[index];
          });
          setDepartmentNames(names);
          setLoadingDepartments(false);
          setDepartmentsLoaded(true); 
        })
        .catch(error => {
          console.error("Error loading department names:", error);
          setLoadingDepartments(false);
        });}
  }, [employees])

  useEffect( () => {
    getEmployees()  
    setRefreshTable(false)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [refreshTable])

  useEffect(() => {
    getEmployees(searchTerm)
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [searchTerm, refreshEmployees])

  const handleDeleteEmployee = (ID_EmployeeToDelete, nameEmployee) => {
    setLoading(true)
    const resp = window.confirm("Seguro desea eliminar a: " + nameEmployee + "?");
    if(resp){
      DeleteEmployee({
        ID_EmployeeToDelete: ID_EmployeeToDelete,
        refreshEmployees: refreshEmployees
      })
    }
  }

  const getNameDepartment = async (idDepartment) => {
    try {
      const resp = await fetch(`${endpointDepartment}/${idDepartment}`);
      if(!resp.ok){
        throw new Error(`Error al obtener el nombre del departamento de la API: ${resp.status}`);
      }
      const data = await resp.json();
      return data.name;
    } catch (error) {
      console.log("Error al obtener el nombre del departamento");
    }
  }

  const getEmployees = async (term) => {
    try {
      const resp = await fetch(`${endpoint}/employees`);
      if (!resp.ok) {
        throw new Error(`Error al cargar los datos de la API: ${resp.status}`);
      }
      const data = await resp.json();
  
      if (term && term.trim() !== "") {
        const filteredData = data.filter((employee) => {
          return (
            employee.name.toLowerCase().includes(term.toLowerCase())
            );
          });

        await Promise.all(filteredData.map(async (employee) => {
          await employee.department;
        }));
        
        if(filteredData.length === 0){
          setShowGif(true);
        }else{
          setShowGif(false);
        }
        setEmployees(filteredData);

      } else {
        await Promise.all(data.map(async (employee) => {
          await employee.department;
        }));
        setShowGif(false);
        setEmployees(data);
        
    }
    } catch (error) {
      console.log("Ocurrió un error al llamar a la API: " + error);
    }
  }

  const handleClick = (id) => {
    setModalEditEmployee(true);
    setSelectedEmployeeId(id);
  }

  return(
    <>
      {!loading && !showGif && (
        <div className='tableEmployees'>
          <Table striped bordered hover variant='dark' style={{border: "2px solid #675e48", borderCollapse: "collapse"}}>      
            <thead style={{textAlign: "center"}}>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Dni</th>
                <th>Email</th>
                <th>Position job</th>
                <th>Departament</th>
                <th>Phone</th>
                <th>Birthdate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{textAlign: "center"}}>
            {
              employees && (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.last_name}</td>
                    <td>
                      <Badge pill bg="info" text="dark">
                        {employee.dni}
                      </Badge>
                    </td>
                    <td>{employee.email}</td>
                    <td>
                      <Badge pill bg="light" text="dark">
                        {employee.position_job}
                      </Badge>
                    </td>
                    {loadingDepartments && (
                      <td style={{ textAlign: 'center' }}>
                        <Spinner animation="border" variant="warning" />
                      </td>
                    )}
                    {!loadingDepartments && (
                      <td>{departmentNames[employee.department_id]}</td>
                    )}
                    <td>{employee.phone}</td>
                    <td>{employee.birth_date.split(" ")[0]}</td>
                    <td>
                      <MdEdit
                        style={{ cursor: "pointer", color: "yellow", fontSize: "20px" }}
                        onClick={() => handleClick(employee.id)}
                      />
                      <MdDelete
                        style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
                        onClick={() => {
                          handleDeleteEmployee(employee.id, employee.name);
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}          
            </tbody>
          </Table>

          {showModalEditEmployee && 
            <ModalEditEmployee  idEmployee={selectedEmployeeId} 
                                showModal={showModalEditEmployee}
                                setShowModal={setModalEditEmployee}
                                onClose={refreshEmployees} 
            />
          }
        </div>
      )}
      {
        showGif && (
          <>
            <div style={{justifyContent:'center', alignContent: 'center', display: 'flex', marginTop: '30px'}}>
              <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDkzYTZiZmc2OXFkYWFlbGFsdGZtcDdodWE4MHlqMmg2OTFsa3VjdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aTskHEUdgCQAXde/giphy.gif" alt='GIF' width="300" height="200"/>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '45px'
              }}
            >
              <div style={{ width: '300px', textAlign: 'center' }}>
                <Alert key={'danger'} variant={'danger'}>
                  ¡Not Found your search!
                </Alert>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}

export default TableEmployees;