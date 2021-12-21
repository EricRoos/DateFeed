import * as React from "react";
import useActivityFeedData from './query';
import LikeButton from '../like-button';
import TimeLine from '../time-line';
import Panel from '../panel';
import SelectInput from '../inputs/select';
import { Formik } from 'formik';
import { formatDistance } from 'date-fns';

const ActivityFeed = () => {
  const {
    loading,
    error,
    data
  } = useActivityFeedData();

  if(!loading && !error){
    const {
      activityFeed
    } = data;
    return (
      <Formik
        initialValues={{time: 15}}
        onSubmit={ () => {} }
      >
        {(values) => (
          <div className='grid grid-cols-1 gap-2'>
            <div className='pb-4'>
              <Panel>
                <div className='py-3'>
                  <h1 className='text-2xl flex items-center'>
                    <div className='tracking-wider'>
                      Activity Feed
                    </div>
                  </h1>
                </div>
              </Panel>
              <div>
                <SelectInput name='time' label='Newer Than...'>
                  <SelectInput.Option value='5'>5 minutes</SelectInput.Option>
                  <SelectInput.Option value='15'>15 minutes</SelectInput.Option>
                  <SelectInput.Option value='30'>30 minutes</SelectInput.Option>
                  <SelectInput.Option value='60'>1 hour</SelectInput.Option>
                </SelectInput>
              </div>
            </div>
            <TimeLine>
              { activityFeed.map( a => (
                <TimeLine.Item key={a.post.id}>
                  <div className='grid grid-cols-1 divide-y'>
                    <div>
                      <h3 className="font-bold text-white text-2xl">{a.post.profile.name}</h3>
                      <p className="mt-2 text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
                        {a.post.content}
                      </p>
                    </div>
                    <div className='text-white'>
                      <p className="text-sm text-gray-100">{formatDistance(new Date(a.post.createdAt), new Date(), { addSuffix: true })}</p>
                      { a.likeable && ( <LikeButton liked={a.liked} postId={a.post.id}/> )}
                    </div>
                  </div>
                </TimeLine.Item> 
              )) }
            </TimeLine>
          </div>
        )}
      </Formik>
    )
  }

  if(loading){
    return (
      <div>Loading</div>
    )
  }
  if(error){
    console.error(error);
    return (
      <div>Something went wrong</div>
    )
  }
}

export default ActivityFeed;
