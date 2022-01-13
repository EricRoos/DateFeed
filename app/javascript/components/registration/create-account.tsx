import * as React from 'react';
import { 
  useMutation,
  gql
} from "@apollo/client";

const REGISTER_ACCOUNT_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!){
    userRegister(email: $email, password: $password, passwordConfirmation: $password, confirmUrl: "confirmthisplz?"){
      authenticatable {
        email
      }
    }
  }
`

const useCreateAccount = () => {
  return useMutation<
      { userRegister: { authenticatable: String }},
      { email: String, password: String }
    >(
      REGISTER_ACCOUNT_MUTATION,
    );

};

export default useCreateAccount
