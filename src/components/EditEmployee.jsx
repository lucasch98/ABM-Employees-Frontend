const endpointEdit = 'https://abm-employees-backend-production.up.railway.app/api/employee'

const EditEmployee = async ({
  id, name, last_name, dni, email, 
  phone, department_id, position_job,
  birth_date, onClose, setShowModal
}) => {
  fetch(`${endpointEdit}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        last_name: last_name,
        dni: dni,
        phone: phone,
        position_job: position_job,
        department_id: department_id,
        email: email,
        birth_date: birth_date,
      })
  }).then(response => {
    if(!response.ok){
      console.log('Error to update data employee');
      return;
    }
    return response.json()
  }).then(setShowModal(false))
  .then(onClose('success-message-update-employee'))
  .catch(error => console.log("Error update data employee", error))
}

export default EditEmployee;