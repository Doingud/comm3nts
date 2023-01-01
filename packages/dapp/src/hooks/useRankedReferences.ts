import useSWR from 'swr'
import api from '../utils/comm3nts-api';

const fetcher = async (func: string) => {
  const { data, error } = await api.rpc(func)
    .filter('context', 'not.eq', null)
  ;
  const refMap = data?.reduce((rv: any, x: any) => {
    (rv[x['date']] = rv[x['date']] || []).push(x);
    return rv;
  }, {})
  return refMap;
}

function useRankedReferences() {
  const { data, error, isLoading } = useSWR('context_daily_count',
    fetcher
  )

  return {
    isLoading,
    isError: error,
    refMap: data,
  }
}

export default useRankedReferences;