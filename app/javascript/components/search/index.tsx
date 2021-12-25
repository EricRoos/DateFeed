import * as React from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover'

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

const ProfileMenu = (props) => {
  const { profile } = props;

  const {
    name,
    age,
    distance
  } = profile;
  return (
    <div className='w-fit bg-gray-300 p-3 drop-shadow-2xl'>
      <div>
        <div style={{width: '30vw'}}>
          <img src={profile.profileImageUrl} className-'w-full'/>
        </div>
      </div>
      <div className='text-lg'>{name}</div>
      <div>{age}</div>
      <div>{distance}</div>
    </div>
  )
}


const Results = ( props ) => {
  const { setSearchVars, error, profiles, loading } = useSearch(props.values);
  const [ currentProfileId, setCurrentProfileId ] = React.useState(undefined);

  const debounceSearch = React.useRef( debounce( (vals) => {
    setSearchVars(vals);
  }, 1000));


  React.useEffect( () => {
    debounceSearch.current(props.values);
  }, [props.values])

  return (
    <div className='flex flex-wrap gap-4 justify-between'>
      { !error && !loading && !!profiles.length && profiles.map( profile => {
        const profileOpacity = !!currentProfileId ? profile.id === currentProfileId ? 100 : 25 : 100;
        return (
          <Popover
            reposition={true}
            onClickOutside={ () => setCurrentProfileId(undefined) }
            isOpen={profile.id === currentProfileId}
            positions={['left', 'right']}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowSize={10}
                arrowColor={'rgb(209, 213, 219)'}
                arrowStyle={{ opacity: 0.7 }}
                className='popover-arrow-container'
                arrowClassName='popover-arrow'
              >
                <ProfileMenu profile={profile} />
              </ArrowContainer>
            )}
          > 
              <button
                onClick={() => setCurrentProfileId(profile.id)}
                key={profile.id}
                className={`w-1/5 bg-gray-800 flex justify-center items-center drop-shadow-lg opacity-${profileOpacity}`}
                aria-label={profile.name}
              >
                <img src={profile.profileImageUrl} />
              </button>
          </Popover>
        )
      }) }
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
                      <button onClick={ () => setFiltersOpen(true) } aria-label='Open Filters'>
                        <Icon glyph='filter'/>
                      </button>
                    )}
                    { filtersOpen && (
                      <button onClick={ () => setFiltersOpen(false) } aria-label='Close Fitlers'>
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
