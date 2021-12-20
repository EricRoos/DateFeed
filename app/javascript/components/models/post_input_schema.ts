import * as yup from 'yup';

const postInputTypeSchema = yup.object().shape({
  content: yup.string().required('cannot be blank'),
});

export default postInputTypeSchema;
