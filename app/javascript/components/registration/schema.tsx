import * as yup from 'yup';

export default yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirmation: yup.string().required(),
});
