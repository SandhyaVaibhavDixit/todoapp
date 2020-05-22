import { useState, useEffect } from 'react';
import validate from "../_utils/validate";

const useForm = (callback, formInputs) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsSubmitting(false);
      callback(values);
    }
  }, [errors, isSubmitting, values, callback]);

  const onSubmit = (e) => {
    if (e) e.preventDefault();

    const errors = validate(values, formInputs);

    setErrors(errors);
    setIsSubmitting(true);
  };

  const onChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    console.log(name, ': ', value)
    setValues(values => ({ ...values, [name]: value }));
  };

  return {
    onChange,
    onSubmit,
    values,
    errors,
  }
};

export default useForm;