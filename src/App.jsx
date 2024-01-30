
import TableEmployees from './components/TableEmployees'
import { IoPersonAdd } from "react-icons/io5";
import './App.css'
import { useState } from 'react';
import ModalCreateEmployee from './components/ModalCreateEmployee';
import NabvarABM from './components/NabvarABM';
import Spinner from 'react-bootstrap/Spinner';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TitlePage from './components/TitlePage';
import TableDepartments from './components/TableDepartments';

function App() {
  const [showCreateEmployee, setShowCreateEmployee] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [refreshTableDepartments, setRefreshTableDepartments] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showGif, setShowGif] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  const handleClick = () => {
   setShowCreateEmployee(true);
  }

  const handleCerrarModal = (message) => {
    setShowCreateEmployee(false);
    setRefreshTable(true);
    setRefreshTableDepartments(true);
    if(message != null && message != ""){
      showMessage(message)
    }
  }

  const showMessage = (message) => {
    var eventMessage = document.getElementById(message);
    eventMessage.style.display = 'block';
    setTimeout(function() {
      eventMessage.style.display = 'none';
    }, 3000);
  }

  return (
    <>
    <BrowserRouter>
      <NabvarABM setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path='/' element={
          <>
            <div className='container'>
              <TitlePage title={"Employees Directory"}/>
              <div id="success-message-employee" className="success-message">
                ¡New Employee added successfully!
              </div>
              <div id="success-message-update-employee" className="success-message-update">
                !Employee updated successfully!
              </div>
              <div id="delete-message-employee" className="delete-message">
                ¡Employee deleted successfully!
              </div>
                  
              {
                !loading && !showGif &&
                <div style={{display:'flex', justifyContent: 'right', alignItems: 'right', marginBottom: '1%', marginTop: '1%'}}>
                  <IoPersonAdd onClick={handleClick} style={{cursor: "pointer", color: "#1e9518", fontSize: "33px"}}/>
                </div>
              } 
              <div className="d-flex flex-column min-vh-100">
                <TableEmployees refreshTable={refreshTable} setRefreshTable={setRefreshTable} refreshEmployees={handleCerrarModal} 
                  searchTerm={searchTerm} loading={loading} setLoading={setLoading}
                  showGif={showGif} setShowGif={setShowGif}/>
                {showCreateEmployee && 
                  <ModalCreateEmployee showModal={showCreateEmployee} onClose={handleCerrarModal} />
                }
              </div>
                {loading &&
                  <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <Spinner animation="border" variant="warning" />  
                  </div>
                } 
            </div>
          </>
        } />

        <Route path='/departments' element={
          <>
            <TitlePage title={"Departments directory"} />
            <div className="d-flex flex-column min-vh-100">
              <div id="success-message-department" className="success-message">
                ¡New Department added successfully!
              </div>
              <div id="success-message-update-department" className="success-message-update">
                !Department updated successfully!
              </div>
              <div id="delete-message-department" className="delete-message">
                !Department deleted successfully!
              </div>
              <TableDepartments onClose={handleCerrarModal} 
                    refreshTableDepartments={refreshTableDepartments}
                    setRefreshTableDepartments={setRefreshTableDepartments}
                    searchTerm={searchTerm}
                    loadingDepartments={loadingDepartments}
                    setLoadingDepartments={setLoadingDepartments}
              />
              {loadingDepartments &&
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                  <Spinner animation="border" variant="warning" />  
                </div>
              }
            </div>
          </>
        } />
      </Routes>
    </BrowserRouter>
    <Footer footerText={"2024 ABM employee"}/>
    </>
  )
}

export default App
