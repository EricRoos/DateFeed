import * as React from 'react';
import { 
  useMutation,
  gql
} from "@apollo/client";

const CONFIRM_ACCOUNT_MUTATION = gql`
  mutation ConfirmUser($confirmationToken: String!){
    userConfirmRegistrationWithToken(confirmationToken: $confirmationToken){
      credentials {
        accessToken
        client
      }
    }
  }
`
interface CredentialsType {
  accessToken: String;
  client: String;
}

const useConfirmAccount = () => {
  return useMutation<
      { userConfirmRegistrationWithToken: { credentials: CredentialsType }},
      { confirmationToken: String }
    >(
      CONFIRM_ACCOUNT_MUTATION,
    );

};

export default useConfirmAccount
