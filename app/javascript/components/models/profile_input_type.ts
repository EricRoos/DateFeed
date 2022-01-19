import * as yup from 'yup';
import ProfileInputSchema from './profile_input_schema';

export default interface ProfileInputType extends yup.InferType<typeof ProfileInputSchema>{};
