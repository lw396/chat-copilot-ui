import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { fetcher } from 'utils/axios';
import { Input } from '@mui/material';
import FormikRadioGroup from './component/RadioGroups';

export default function Regist() {
  const [initialValues, setInitialValues] = useState({
    id: '',
    name: '',
    address: ''
  });

  const getInfo = async () => {
    const memberInfo = await fetcher(['http://localhost:8082/memberInfo', { params: { id: 123 } }]);
    // console.log(memberInfo)
    setInitialValues(memberInfo);
  };
  //
  useEffect(() => {
    getInfo();
    // console.log(initialValues);
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true
  });

  // console.log('formik.values.name', formik.values.name);
  // console.log('formik.values.address', formik.values.address);
  console.log('formik.values', formik.values);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1> hello</h1>
        <Input value={formik.values.name} onChange={formik.handleChange} name="name"/>
        {/* <FormikRadioGroup name="address" form={{ touched: formik.touched, errors: formik.errors }} options={['test1', 'test2', 'test3']} /> */}
        <FormikRadioGroup name="address" form={formik} options={['test1', 'test2', 'test3']} />
      </form>
    </div>
  );
}
