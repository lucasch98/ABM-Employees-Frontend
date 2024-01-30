import { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import Table from 'react-bootstrap/Table';
import DeleteDepartment from './DeleteDepartment';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ModalCreateDepartment from './ModalCreateDepartment';
import ModalEditDepartment from './ModalEditDepartment';
import { FaUserGroup } from "react-icons/fa6";
import ShowEmployeesOffCanvas from './ShowEmployeesOffCanvas';
import Spinner from 'react-bootstrap/Spinner';

const endponitDepartments = 'https://abm-employees-backend-production.up.railway.app/api/departments';

const TableDepartments = ({onClose, searchTerm,
              refreshTableDepartments, setRefreshTableDepartments,
              loadingDepartments, setLoadingDepartments
}) => {

  const [departments, setDepartments] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [showModalCreateDepartment, setShowModalCreateDepartment] = useState(false);
  const [showModalEditDepartment, setShowModalEditDepartment] = useState(false);
  const [idDepartmentUpdate, setIdDepartmentUpdate] = useState(null);
  const [showOffCanvasEmployees, setOffCanvasEmployees] = useState({});


  useEffect(() => {
    setLoadingDepartments(true)
    getDepartments(searchTerm)
    setRefreshTableDepartments(false)
  }, [refreshTableDepartments, searchTerm])

  const getDepartments = async (searchTerm) => {
    try {
      const resp = await fetch(`${endponitDepartments}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      
      if (!resp.ok) {
        throw new Error("Error when bringing departments from the API");
      }

      const data = await resp.json();
      if(searchTerm && searchTerm.trim() !== ""){
        const filteredData = data.filter((department) => {
          return(
              department.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })

        if(filteredData.length === 0){
          setShowGif(true);
        }else{
          setShowGif(false);
        }

        setDepartments(filteredData);
        setLoadingDepartments(false);
      }else{
        setShowGif(false);
        setDepartments(data);
        setLoadingDepartments(false);
      }

    } catch (error) {
      console.log('Error when bringing departments from the API:', error);
    }
  }

  const handleClickEdit = (idDepartment) => {
    setShowModalEditDepartment(true);
    setIdDepartmentUpdate(idDepartment);
  }

  const handleDeleteDepartment = (id_Department, nameDepartment) => {
    if(window.confirm("Are you sure to delete: " + nameDepartment + "?")){
      DeleteDepartment({
        id_Department : id_Department,
        onClose: onClose,
        setRefreshTableDepartments: setRefreshTableDepartments
      })
    }
  }

  const handleAddDepartment = () => {
    setShowModalCreateDepartment(true);
  }


  return (
    <>
      <div className='container'>
      {!showGif && !loadingDepartments && (
        <>
          <div style={{ textAlign: 'right', marginBottom: "1%", marginTop: "3%" }}>
            <Button variant="success" onClick={handleAddDepartment}>Add department</Button>
          </div>
          <Table striped bordered hover size="sm" variant="dark">
            <thead style={{textAlign: "center"}}>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Employees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{textAlign: "center"}}>
            {
              departments && (
                departments.map((department) => (
                  <tr key={department.id}>
                    <td>{department.name}</td>
                    <td>{department.description}</td>
                    <td>
                      <FaUserGroup key={department.id} style={{cursor: 'pointer'}} onClick={() => setOffCanvasEmployees(prevState => ({
                                                              ...prevState,
                                                              [department.id]: true
                      }))}/>
                      
                    </td>
                      {
                        showOffCanvasEmployees[department.id] && (
                          <ShowEmployeesOffCanvas 
                            id_Department={department.id}
                            showOffCanvasEmployees={showOffCanvasEmployees[department.id]}
                            setOffCanvasEmployees={setOffCanvasEmployees}
                          />
                        )
                      }
                    <td>
                      <MdEdit
                        style={{ cursor: "pointer", color: "yellow", fontSize: "20px" }}
                        onClick={() => handleClickEdit(department.id)}
                      />
                      <MdDelete
                        style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
                        onClick={() => {
                          handleDeleteDepartment(department.id, department.name);
                        }}
                      />
                    </td>    
                  </tr>
                ))
              )
            }
            </tbody>
          </Table>
        </>
      )}
      {showGif && (
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
      )}
      {
        showModalCreateDepartment && (
          <ModalCreateDepartment 
            onClose={onClose}
            showModalCreateDepartment={showModalCreateDepartment} 
            setShowModalCreateDepartment={setShowModalCreateDepartment}
          />
        )
      }
      {
        showModalEditDepartment && (
          <ModalEditDepartment  
            onClose={onClose} 
            showModalEditDepartment={showModalEditDepartment}
            setShowModalEditDepartment={setShowModalEditDepartment}
            id_Department={idDepartmentUpdate}
          />
        )
      }
    </div>
  </>
  )
}

export default TableDepartments;