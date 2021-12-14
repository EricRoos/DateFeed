import * as React from "react";
import { isEmpty, omitBy } from 'lodash';
import {
  useQuery,
  gql
} from "@apollo/client";

import ProfileType from '../models/profile';


const SEARCH_QUERY = gql`
  query ProfileSearch($searchParam: ProfileSearchInput!){
    profileSearch(searchParam: $searchParam){
      name
      age
      id
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
  searchParam: SearchQueryVars;
}

const useSearch = (initialVars : SearchQueryVars) => {
  const [ searchVars, setSearchVars ] = React.useState(initialVars)
  const {
    loading,
    error,
    data
  } = useQuery<SearchQueryData, QueryVars>(
    SEARCH_QUERY,
    {
      variables: { searchParam: omitBy(searchVars, (v) => !v) }
    }
  );
  if(!!error){
    console.error(error);
  }
  return {
    setSearchVars,
    loading,
    error,
    data,
    profiles: !!data ? data.profileSearch : undefined
  }
}

export default useSearch;
