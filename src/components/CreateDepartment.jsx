
const endpointCreateDepartment = 'https://abm-employees-backend-production.up.railway.app/api/department';

const CreateDepartment = async ({onClose
  , nameDepartment, descriptionDepartment, setShowModalCreateDepartment
}) => {

  const newDepartment = {
    name: nameDepartment,
    description: descriptionDepartment
  }

  fetch(`${endpointCreateDepartment}`, {
    method:  "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newDepartment)
  }).then(resp => {
    if(!resp.ok){
      throw new Error("Error to create a new department")
    }
    
    return resp.json();
  }).then(setShowModalCreateDepartment(false))
  .then(onClose("success-message-department"))
  .catch((error) => console.log('Ocurrió un error al crear el Departamento', error));
}

export default CreateDepartment;