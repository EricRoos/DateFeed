import * as React from "react";
import { isEmpty, omitBy } from 'lodash';
import {
  useQuery,
  gql
} from "@apollo/client";

import ProfileType from '../models/profile';
import { PageContext } from '../as-page';


const SEARCH_QUERY = gql`
  query ProfileSearch($searchParam: ProfileSearchInput!){
    profileSearch(searchParam: $searchParam){
      name
      age
      id
      profileImageUrl
      photoUrls
    }
  }
`

interface SearchQueryData {
  profileSearch: [ProfileType]
}

interface SearchQueryVars {
  minAge?: number;
  maxAge?: number;
}

interface QueryVars {
  async: Boolean,
  searchParam: SearchQueryVars;
}

const useSearch = (initialVars : SearchQueryVars) => {
  const [ searchVars, setSearchVars ] = React.useState(initialVars)
  const { resolvedQueries } = React.useContext(PageContext);

  const {
    loading,
    error,
    data
  } = useQuery<SearchQueryData, QueryVars>(
    SEARCH_QUERY,
    {
      variables: { async: true, searchParam: omitBy(searchVars, (v) => !v) }
    }
  );
  if(!!error){
    console.error(error);
  }
  let found = {};
  let done = false;
  if(data){
    const jobId = data['jobId'];
    found = resolvedQueries.find( (query) => query['jobId'] === jobId );
    if(found){
      console.log("Found %o", found);
      found = found['result']['data'];
      done = true;
    }else{
      found = {}
    }
  }

  return {
    setSearchVars,
    loading: !done,
    error,
    data,
    profiles: done ? found['profileSearch'] : []
  }
}

export default useSearch;
