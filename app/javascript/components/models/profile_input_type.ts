import * as yup from 'yup';
import ProfileInputSchema from './profile_input_schema';

type ProfileInputType = yup.InferType<typeof ProfileInputSchema>;

export default ProfileInputType;
