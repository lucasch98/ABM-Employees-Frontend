const endpointStoreEmployee = 'https://abm-employees-backend-production.up.railway.app/api/employee';

const CreateEmployee = async ({
  name_Employee, 
  last_name_Employee,
  dni_Employee,
  phone_Employee,
  position_job_Employee,
  department_Employee,
  email_Employee,
  birth_date_Employee,
  onClose
}) => {
             
  const newEmployee = {
    name: name_Employee,
    last_name: last_name_Employee,
    dni: dni_Employee,
    birth_date: birth_date_Employee,
    email: email_Employee,
    position_job: position_job_Employee,
    phone: phone_Employee,
    department_id: department_Employee,
  }

    fetch(`${endpointStoreEmployee}`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
    .then(response => {
      if(!response.ok){
        console.log('Error to send data employee');
        return;
      }
      return response.json()
    })
    .then(onClose('success-message-employee'))
    .catch(error => console.log('Error', error));
  }

export default CreateEmployee;