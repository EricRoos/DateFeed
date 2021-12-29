import * as React from 'react';
import Icon from 'supercons';

import { Link } from 'react-router-dom';

const Nav = () => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  if(!isOpen){
    return (
      <div className='flex flex-row fixed right-3 bottom-3 z-20'>
        <Link to='/new-post'
          className='hover:text-white bg-orange-500 rounded-full p-1 flex shadow scale-50'
          onClick={ () => setIsOpen(false) }
        >
          <Icon glyph='post' size={48} />
        </Link>
        <button onClick={ () => {
            setIsOpen(true);
          }}
          className='focus:text-orange-500 bg-gray-200 rounded-full p-1 flex drop-shadow-lg'
        >
          <Icon glyph='menu' size={48} />
        </button>
      </div>
    )
  }
  return (
    <div className="h-full w-screen flex fixed top-0 z-20">
      <aside
        className="flex flex-col items-center bg-white text-gray-700 shadow h-full">
        <div className="h-16 flex items-center w-full">
          <a className="w-3/5 mx-auto" href="http://svelte.dev/">
            <img
              className="mx-auto"
              src={document.querySelector("meta[name='logo:badge']").getAttribute("content")}
              alt="svelte logo" />
          </a>
        </div>

        <ul>
          <li className="hover:bg-gray-100">
            <Link to='/'
              onClick={ () => setIsOpen(false) }
              className="h-16 px-6 flex flex justify-center items-center w-full
              focus:text-orange-500">
              <Icon glyph='announcement' />
            </Link>
          </li>
          <li className="hover:bg-gray-100">
            <Link to='/search'
              onClick={ () => setIsOpen(false) }
              className="h-16 px-6 flex flex justify-center items-center w-full
              focus:text-orange-500">
              <Icon glyph='search' />
            </Link>
          </li>
          <li className="hover:bg-gray-100">
            <Link to='/me'
              onClick={ () => setIsOpen(false) }
              className="h-16 px-6 flex flex justify-center items-center w-full
              focus:text-orange-500">
              <Icon glyph='profile' />
            </Link>
          </li>
        </ul>

        <div className="mt-auto h-16 flex items-center w-full">
          <a href='/users/sign_out'
            className="h-16 w-10 mx-auto flex flex justify-center items-center"
          >
            <Icon glyph='door-leave' />
          </a>
        </div>

      </aside>
      <div onClick={() => setIsOpen(false)} className='h-screen w-screen relative top-0 bg-gray-200 opacity-50'/>
    </div>
  );
}

export default Nav;
