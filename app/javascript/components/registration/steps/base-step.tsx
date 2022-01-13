import * as React from 'react';

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

export default BaseStep;
