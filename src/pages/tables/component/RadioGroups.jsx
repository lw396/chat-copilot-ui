import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Fragment } from 'react';

const FormikRadioGroup = ({ form: { touched, errors, values, handleChange }, name, options, ...props }) => {
  console.log('radiogroups')
  return (
    <>
      <RadioGroup {...props} name={name} value={values[name]}>
        {options.map((option) => (
          <FormControlLabel key={option} value={option} control={<Radio onChange={handleChange}/>} label={option} />
        ))}
      </RadioGroup>

      {touched[name] && errors[name] && <Fragment>{errors[name]}</Fragment>}
    </>
  );
};

export default FormikRadioGroup;
