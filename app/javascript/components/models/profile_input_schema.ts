import * as yup from 'yup';

const profileInputTypeSchema = yup.object().shape({
  age: yup.number(),
  name: yup.string(),
}).strict(true);

export default profileInputTypeSchema;
