const ENDPOINT_UPDATE_DEPARTMENT = 'https://abm-employees-backend-production.up.railway.app/api/department';

const EditDepartment = async ({nameDepartment, descriptionDepartment, id_Department,
                         onClose, setShowModalEdit
}) => {

  const updateDepartment = {
    name: nameDepartment,
    description: descriptionDepartment
  }


  fetch(`${ENDPOINT_UPDATE_DEPARTMENT}/${id_Department}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateDepartment)
  }).then(setShowModalEdit(false))
    .then(onClose('success-message-update-department'))
    .catch(error => console.log("Error to update department", error))
    
}

export default EditDepartment;