// import { useEffect, useState } from 'react';
import useSWR from 'swr'
import parseReference, { resolveReference } from '../utils/reference';
import makeBlockie from 'ethereum-blockies-base64';
import { fetchCredentials } from '../utils/comm3nt';
import { orbis } from '../../context'

const fetcher = async (did: string) => {
  return await fetchCredentials(orbis, did)
  
}

function useCredentials (did: string) {
  const { data, error, isLoading } = useSWR(did,
    fetcher,
    // {
    //   dedupingInterval: 30000,
    //   focusThrottleInterval: 60000,
    // }
  )

  return {
    isLoading,
    isError: error,
    credentials: data,
  };
}

export default useCredentials;
