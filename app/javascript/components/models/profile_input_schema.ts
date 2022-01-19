import * as yup from 'yup';

const profileInputTypeSchema = yup.object({
  age: yup.number().nullable(true),
  name: yup.string(),
}).strict(true);

export default profileInputTypeSchema;
