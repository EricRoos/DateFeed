import * as yup from 'yup';
import PostInputSchema from './post_input_schema';

type PostInputType = yup.InferType<typeof PostInputSchema>;

export default PostInputType;
