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


const BaseStep = (props) => {
  const {
    title,
    stepString,
    extraContent,
    innerContent,
    actionContent
  } = props;

  return (
    <div className='flex flex-col h-full gap-6'>
      <div className='text-2xl pt-2'>{title}</div>
      <div className='flex-grow flex flex-col items-center justify-center h-full'>
        { innerContent }
      </div>
      <div>
        { actionContent }
      </div>
    </div>
  );
}

const FloatField = ({label, ...props}) => {
  return (
    <div>
      <div className='text-center'>
        <label htmlFor={props.id} className='text-lg text-gray-500 pt-2 pb-6'>{label}</label>
      </div>
      <div >
        <div className="relative z-0 w-full mb-5">
          <Field
            {...props}
            className="text-center pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 border-gray-200"
          />
          <span className="text-sm text-red-600 hidden invalid:show" id="error">is required</span>
        </div>
      </div>
    </div>
  );
}
const CollectEmail = (props) => {
  const { values, errors } = useFormikContext(); 

  const canGoNext = !!values.email && !errors.email;

  return (
    <BaseStep
      title='First...'
      stepString={'1/4'}
      innerContent={(
        <>
          <FloatField name='email' id='email' label='Email' type='email'/>
          <Animate animation=''>
            <div className='text-sm text-gray-500 mt-8' >
              <p className=''>
                So that we can keep in touch about important things, we need a valid email.
              </p>
              <p className='mt-2'>
                We promise we won't bug you with spam. Or sell your information. Just notifications that you can control in your account panel after you finish signup.
              </p>
            </div>
          </Animate>
        </>
      )}
      actionContent={(
        <div className='flex flex-col gap-2'>
        <div className='w-full'>
          { canGoNext && (
              <Animate animation='pulse animate__infinite'>
                <Button onClick={props.onNext} className='w-full'>Next</Button>
              </Animate>
          ) }
          { !canGoNext && (
              <Button disabled className='w-full opacity-25'>Next</Button>
          ) }
        </div>
        <Button disabled className='w-full bg-gray-300'>Cancel</Button>
        </div>
      )}
    />
  );
};

const CollectPassword = (props) => {
  const { values, errors } = useFormikContext(); 

  const canGoNext = !!values.password && !errors.password;

  return (
    <BaseStep
      title='Security things'
      stepString={'2/4'}
      innerContent={(
        <>
          <FloatField name='password' id='password' label='Password' type='password'/>
          <Animate animation=''>
            <div className='text-sm text-gray-500 mt-8' >
              <ul>
                <li>At least 6 characters</li>
              </ul>
            </div>
          </Animate>
        </>
      )}
      actionContent={(
        <div className='flex flex-col gap-2'>
        <div className='w-full'>
          { canGoNext && (
              <Animate animation='pulse animate__infinite'>
                <Button onClick={props.onNext} className='w-full'>Next</Button>
              </Animate>
          ) }
          { !canGoNext && (
              <Button disabled className='w-full opacity-25'>Next</Button>
          ) }
        </div>
        <Button disabled className='w-full bg-gray-300'>Cancel</Button>
        </div>
      )}
    />
  );
};

const CollectPasswordConfirmation = (props) => {
  const { values, errors } = useFormikContext(); 

  const canGoNext = !!values.passwordConfirmation && !errors.passwordConfirmation

  return (
    <BaseStep
      title='Just to confirm.'
      stepString={'3/4'}
      innerContent={(
        <>
          <FloatField name='passwordConfirmation' id='passwordConfirmation' label='Re-Enter Password' type='password'/>
          <Animate animation=''>
          </Animate>
        </>
      )}
      actionContent={(
        <div className='flex flex-col gap-2'>
        <div className='w-full'>
          { canGoNext && (
              <Animate animation='pulse animate__infinite'>
                <Button onClick={props.onNext} className='w-full'>Next</Button>
              </Animate>
          ) }
          { !canGoNext && (
              <Button disabled className='w-full opacity-25'>Next</Button>
          ) }
        </div>
        <Button disabled className='w-full bg-gray-300'>Cancel</Button>
        </div>
      )}
    />
  );
};

const Tos = (props) => {
  const { values, errors } = useFormikContext(); 

  const canGoNext = true;

  return (
    <BaseStep
      title='Legal Stuff'
      stepString={'4/4'}
      innerContent={(
        <>
          <p>
            words words words
          </p>
          <Animate animation=''>
          </Animate>
        </>
      )}
      actionContent={(
        <div className='flex flex-col gap-2'>
          <div className='w-full'>
            <Animate animation='pulse animate__infinite'>
              <Button onClick={props.onNext} className='w-full'>I Accept</Button>
            </Animate>
          </div>
          <Button disabled className='w-full bg-gray-300'>No thanks</Button>
        </div>
      )}
    />
  );

}
const RegistrationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const Registration = () => {
  const [ currentStep, setCurrentStep ] = React.useState('email');

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
      <CollectPasswordConfirmation onNext={() => {setCurrentStep('tos')} }/>
    ),
    tos: () => (
      <Tos />
    ),
  }


  return (
    <Formik
      validationSchema={RegistrationSchema}
      initialValues={{email:'', password:'', passwordConfirmation: ''}}
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
