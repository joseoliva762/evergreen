import { useState } from 'react';


export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState || {});

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value
    });
  };

  const handleSubmit = (event, callback) => {
    event.preventDefault();
    callback && callback();
    return true;
  };

  const resetForm = () => {
    setForm({});
  };

  const refillForm = (data) => {
    setForm(data);
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    resetForm,
    refillForm
  };
};