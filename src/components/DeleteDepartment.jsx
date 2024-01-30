const endponitDepartment = 'https://abm-employees-backend-production.up.railway.app/api/department';

const DeleteDepartment = async ({ id_Department, onClose, setRefreshTableDepartments }) => {
  fetch(`${endponitDepartment}/${id_Department}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json' 
    }
  }).then(
    resp => {
      if(!resp.ok){
        throw new Error("Error to delete department");
      }
      
    }
  ).then(setRefreshTableDepartments(true))
  .then(onClose('delete-message-department'))
  .catch(error => {
    console.log("Error to delete department ", error)
  })
}

export default DeleteDepartment;