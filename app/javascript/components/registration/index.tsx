import * as React from 'react';
import * as yup from 'yup';

import {
  Formik,
  Field,
  useFormikContext,
} from 'formik'

import Multistep from 'react-multistep'
import Button from '../inputs/button';
import Animate from '../animate';

import useCreateAccount from './create-account';

import FloatField from '../inputs/float-field';
import BaseStep from './steps/base-step';
import CollectEmail from './steps/collect-email';
import CollectPassword from './steps/collect-password';
import CollectPasswordConfirmation from './steps/collect-password-confirmation';
import Tos from './steps/tos';

import RegistrationInput from './type';
import RegistrationSchema from './schema';

const CreateAccount = (props) => {
  const { values , errors } : RegistrationInput & any = useFormikContext(); 
  const [ createAccount , { loading, data } ] = useCreateAccount();

  React.useEffect( () => {
    createAccount({variables: {
      email: values.email,
      password: values.password
    }}).then( () => props.onNext() );
  }, [values]);
  
  return (
    <BaseStep
      title='Saving...'
      stepString={'4/4'}
      innerContent={(
          <Animate animation=''>
            <div className='text-sm text-gray-500 mt-8' >
            <p className='mt-2'>
              Saving your account, please wait.    
            </p>
          </div>
        </Animate>
      )}
      actionContent={null}
    />
  )
}


const Registration = (props) => {
  const [ currentStep, setCurrentStep ] = React.useState(props.currentStep || 'email');

  const steps = {
    email: () => (
      <Animate key='email-collect' animation='fadeIn' className='h-full w-full'>
        <CollectEmail onNext={() => {setCurrentStep('password')} }/>
      </Animate>
    ),
    password: () => (
      <Animate key='password-collect' animation='fadeIn' className='h-full w-full'>
        <CollectPassword onNext={() => {setCurrentStep('passwordConfirmation')} }/>
      </Animate>
    ),
    passwordConfirmation: () => (
      <Animate key='password-confirm-collect' animation='fadeIn' className='h-full w-full'>
        <CollectPasswordConfirmation onNext={() => {setCurrentStep('tos')} }/>
      </Animate>
    ),
    tos: () => (
      <Animate key='tos-accept-collect' animation='fadeIn' className='h-full w-full'>
        <Tos onNext={() => { setCurrentStep('create') }} />
      </Animate>
    ),
    create: () => (
      <CreateAccount onNext={ () => setCurrentStep('success') } />
    ),
    success: () => (
      <Animate key='confirm-account' animation='fadeIn' className='h-full w-full'>
        You did it! Be on the lookout for a email containing your confirmation code.
      </Animate>
    )
  }

  const initialValues: RegistrationInput = {
    email:'',
    password:'',
    passwordConfirmation: ''
  };

  return (
    <Formik
      validationSchema={RegistrationSchema}
      initialValues={initialValues}
      onSubmit={() => {

      }}
    >
      <div className='flex justify-center p-4'>
        <div className='bg-white h-[80vh] w-full rounded-xl drop-shadow p-4 justify-center items-center overflow-hidden'>
          { steps[currentStep]() }
        </div>
      </div>
    </Formik>
  )
}

export default Registration;
