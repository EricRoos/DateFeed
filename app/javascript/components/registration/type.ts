import * as yup from 'yup';
import RegistrationSchema from './schema';

export default interface RegistrationInput extends yup.InferType<typeof RegistrationSchema>{};
