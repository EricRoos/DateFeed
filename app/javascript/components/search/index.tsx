import * as React from 'react';
import * as yup from 'yup';
import Modal from 'react-modal';
import { ArrowContainer, Popover } from 'react-tiny-popover'

import { debounce } from 'lodash';

import useSearch from './query';
import TextInput from '../inputs/text';
import SelectInput from '../inputs/select';
import useProfileData from '../profile/query';


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
  lookingFor: string;
}

interface ProfileAttributeProps {
  name: String;
  value: String | Number;
}

const ProfileAttribute = (props : ProfileAttributeProps) => (
  <div className='flex justify-between'>
    <div className='font-bold bg-gray-300 w-1/2 mb-1 p-1'>{props.name}</div>
    <div className='bg-gray-100 w-1/2 mb-1 p-1'>{props.value}</div>
  </div>
)
const ProfileMenu = (props) => {
  const { profile } = props;

  const {
    name,
    age,
    distance,
    lookingFor
  } = profile;
  return (
    <div className='divide-y divide-gray-300'>
      <div className='pb-2'>
        <div>
          <img src={profile.profileImageUrl} className='w-full rounded-full drop-shadow'/>
        </div>
        <div className='pt-2 text-2xl text-center pb-2'>{name}</div>
        <div className='photo-strip w-full max-h-32 flex mb-2 p-4 border border-solid border-gray-300 rounded'>
          <div className='flex gap-x-4 overflow-x-scroll'>
            { profile.photoUrls.map( src=> <img src={src} className='h-full w-auto drop-shadow'/> )}
          </div>
        </div>
      </div>
      <div className='pt-2'>
        <ProfileAttribute name='Distance' value={distance} />
        <ProfileAttribute name='Age' value={age} />
        <ProfileAttribute name='Height' value={''} />
        <ProfileAttribute name='Weight' value={''} />
        <ProfileAttribute name='Looking For' value={lookingFor.join(', ')} />
      </div>
    </div>
  )
}


const ProfileActionsPopover = (props) => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  return (
    <Popover
      isOpen={isOpen}
      positions={['bottom', 'right']}
      content={
        <div className='bg-gray-100 p-2 rounded flex gap-2 border border-solid border-gray-300 drop-shadow'>
          <button>
            <Icon glyph='welcome' className='text-red-400'/>
          </button>
        </div>
      }
    >
      <button className='absolute top-4 left-4' onClick={ () => setIsOpen(!isOpen) }>
        <Icon glyph='menu' />
      </button>
    </Popover>
  )
}

const ResultPreview = ( {profileId } ) => {
  const { loading, error, data } = useProfileData(profileId);
  const [ isOpen, setIsOpen ] = React.useState(false);
  console.log(data);
  return (
    <>
      <Modal style={{content: {zIndex: 30, height: '80vh'}}} isOpen={isOpen}>
        <ProfileActionsPopover />
        <button className='absolute top-4 right-4' onClick={ () => setIsOpen(false)}>
          <Icon glyph='view-close' />
        </button>
        { !loading && !error && (
          <ProfileMenu profile={data.profile} />
        )}
      </Modal>
      { !loading && !error && (
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            setIsOpen(true);
          }}
          key={data.profile.id}
          aria-label={data.profile.name}
        >
          <img src={data.profile.profileImageUrl} />
        </button>
      )}
    </>

  )
};

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
      { error && !loading && ( <div>Something went wrong</div> ) }
      { !error && loading && ( <div>Loading Results...</div> ) }
      { !error && !loading && !!profiles.length && profiles.map( profile => {
        const profileOpacity = !!currentProfileId ? profile.id === currentProfileId ? 100 : 25 : 100;
        return (
          <div className={`w-1/5 bg-gray-800 flex justify-center items-center drop-shadow-lg opacity-${profileOpacity}`}>
            <ResultPreview profileId={profile.id} />
          </div>
        )
      }) }
    </div>
  )
}
const searchSchema = yup.object().shape({
  minAge: yup.number()
    .positive().nullable(true),
  maxAge: yup.number().nullable()
    .positive().nullable(true),
  lookingFor: yup.string().nullable()
});
const Search = () => {
  const [ filtersOpen, setFiltersOpen ] = React.useState(false);
  const initialValues: SearchFields = { minAge: 18, maxAge: 99, lookingFor: '' }

  return (
    <div>
      <Formik
        validationSchema={searchSchema}
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
                      <div>
                        <SelectInput id='lookingFor' name='lookingFor' label='Looking For'>
                          <option value=""></option>
                          <option value='right_now'>Right Now</option>
                          <option value='chat'>Chat</option>
                        </SelectInput>
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
