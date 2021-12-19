/**
 * @jest-environment jsdom
 */

import { MockedProvider } from '@apollo/client/testing';
import * as React from 'react';
import { act, render, screen } from '@testing-library/react';

import Profile from './index';
import { PROFILE_QUERY }  from './query';

const mocks = [
  {
    request: {
      query: PROFILE_QUERY,
      variables: {
        profileId: 1
      }
    },
    result: {
      data: {
        profile: {
          name: 'Bill'
        }
      }
    }
  }
]
describe('Profile', () => {
  test('renders correctly', async () => {
    const Component = (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Profile profileId={1} />
      </MockedProvider>
    )
    const { baseElement } = render(Component);
    expect(baseElement).toHaveTextContent('Loading');
    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(baseElement).toHaveTextContent('Profile Bill');
  });
});
