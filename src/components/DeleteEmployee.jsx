const endpointDeleteEmployee = 'https://abm-employees-backend-production.up.railway.app/api/employee';

const DeleteEmployee = async ({ ID_EmployeeToDelete, refreshEmployees }) => {
    fetch(`${endpointDeleteEmployee}/${ID_EmployeeToDelete}`, {
        method: 'DELETE',
      }).then(response => {
        if(!response.ok) {
          console.log('Error al eliminar empleado');
          return;
        }

        return response.json();
      }).then(refreshEmployees('delete-message-employee'))
      .catch(error => {
        console.log("Error when deleting an employee", error);
      })
    
  }

export default DeleteEmployee;