import { checkValidity } from "./CheckValidity";

export default function validate(values, formInputs) {
  let errors = {};

  formInputs.map(({ name, label, validation }) => {

    const value = values[name];
    if (!value) {
      errors[name] = `${label} is required`;
    } 
    else {
      const isValid = checkValidity(value, validation);

      if (isValid === false){
          errors[name] = `${label} is invalid`;
      }
    }
    
    return errors;
  });

  return errors;
}
