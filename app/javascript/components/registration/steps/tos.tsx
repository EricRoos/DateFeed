import * as React from 'react';
import BaseStep from './base-step';
import Animate from '../../animate';
import Button from '../../inputs/button';

import {
  useFormikContext
} from 'formik'


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
          <Button onClick={props.onBack} className='w-full bg-gray-300'>No thanks</Button>
        </div>
      )}
    />
  );
}

export default Tos;
