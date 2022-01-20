import * as React from 'react';

interface ToastProps {
  message: string;
};

const Toast = ({message}: ToastProps) => {
  return (
    <div className='animate__animated animate__fadeIn animate__faster flex items-center text-white max-w-sm bg-green-400 shadow-md rounded-lg overflow-hidden mx-auto fixed bottom-3 left-3 w-50 z-20 toast'>
      <div className='w-10 border-r px-2'>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
          </path>
        </svg>
      </div>
      <div className='flex items-center px-2 py-3'>
        <div className='mx-3'>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Toast;
