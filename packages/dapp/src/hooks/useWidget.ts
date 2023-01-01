import useSWR from 'swr'
import { composeClient } from '../../context'
import { getWidget } from '../utils/comm3nt'

const fetcher = async (stream: string) => {
  return await getWidget(composeClient, stream);
  
}

function useWidget (stream: string) {
  const { data, error, isLoading, mutate } = useSWR(stream,
    fetcher,
    // {
    //   dedupingInterval: 30000,
    //   focusThrottleInterval: 60000,
    // }
  )
  return {
    isLoading,
    isError: error,
    widget: data,
    mutate,
  };
}

export default useWidget;