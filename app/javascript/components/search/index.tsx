import * as React from 'react';

import { debounce } from 'lodash';

import useSearch from './query';
import TextInput from '../inputs/text';


import Panel from '../panel';

import Icon from 'supercons';

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  useField,
  FieldHookConfig
} from 'formik';

interface SearchFields {
  minAge: number;
  maxAge: number;
}

const Results = ( props ) => {
  const { setSearchVars, error, profiles, loading } = useSearch(props.values);

  const debounceSearch = React.useRef( debounce( (vals) => {
    setSearchVars(vals);
  }, 1000));

  React.useEffect( () => {
    debounceSearch.current(props.values);
  }, [props.values])

  return (
    <div className='flex flex-wrap gap-4 justify-between'>
      { !error && !loading && !!profiles.length && profiles.map( d =>(
        <div className='w-1/5 bg-gray-800 flex justify-center items-center drop-shadow-lg'>
          <img src={d.profileImageUrl} />
        </div>
      )) }
    </div>
  )
}

const Search = () => {
  const [ filtersOpen, setFiltersOpen ] = React.useState(false);
  const initialValues: SearchFields = { minAge: 18, maxAge: 99 }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={ () => {} }
      >
        { ({values}) => (
          <div>
            <Panel>
              <div className='flex flex-col divide-y divide-gray-200'>
                <div className='py'>
                  <div className='text-lg flex items-center gap-2'>
                    { !filtersOpen && (
                      <button onClick={ () => setFiltersOpen(true) }>
                        <Icon glyph='filter'/>
                      </button>
                    )}
                    { filtersOpen && (
                      <button onClick={ () => setFiltersOpen(false) }>
                        <Icon glyph='up-caret'/>
                      </button>
                    )}
                    <div className='tracking-wider'>
                      Filter
                    </div>
                  </div>
                </div>
                { filtersOpen && ( 
                  <div>
                    <Form>
                      <div>
                        <TextInput id='minAge' name='minAge' type='number' label='Min Age' />
                      </div>
                      <div>
                        <TextInput id='maxAge' name='maxAge' type='number' label='Max Age' />
                      </div>
                    </Form>
                  </div>
              )}
              </div>
            </Panel>
            <div className='mt-2'>
              <Results values={values} />
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Search;
