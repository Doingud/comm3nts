import useSWR from 'swr'
import parseReference, { resolveReference } from '../utils/reference';

const fetcher = async (context: string) => {
  return await resolveReference(parseReference(context))
  
}

function useResolveReference (reference) {
  const { data, error, isLoading } = useSWR(reference.contextId || reference.ref || reference.context,
    fetcher,
    // {
    //   dedupingInterval: 30000,
    //   focusThrottleInterval: 60000,
    // }
  )
    if (data) {
      data.pfp =
        data?.pfp?.includes('ipfs://') ?
          `https://nftstorage.link/ipfs/${data?.pfp.split('://')[1]}`
          : data?.pfp
    }
  return {
    isLoading,
    isError: error,
    metadata: data,
  };
}

export default useResolveReference;
