import useSWR from 'swr'
import { orbis } from '../../context'
import { fetchPostsWithContext, getWidget, IChannel } from '../utils/comm3nt'
import useMap from './useMap';
import { useEffect, useState } from 'react';

const fetcher = async ([key, contextId, page, partialContext]: [string, string, number, string | undefined]) => {

  if (partialContext) {
    return await fetchPostsWithContext(orbis, contextId, partialContext);
  } else {
    const options = { 
      context: contextId,
      only_master: true,
    }
    const {data, error} = await orbis.getPosts(options, page);
    if (error) throw new Error('Cannot fetch Posts')
    return data
  }
}

function usePosts (channel: IChannel, partialContext?: string) {
  const [posts, actions] = useMap(new Map());
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const { data, error, isLoading } = useSWR(['/posts', channel.contextId, page, partialContext],
    fetcher,
    // {
    //   dedupingInterval: 30000,
    //   focusThrottleInterval: 60000,
    // }
  )
  useEffect(() => {
    if(data) {
      setHasNext(data?.length === 50);
      actions.setAll([...Array.from(posts.entries()), ...data.map(post => [post.stream_id, post])].sort((a, b) => b[1].timestamp - a[1].timestamp))
    }
  }, [data])

  function nextPage() {
    if (!hasNext) return
    setPage(page + 1)
    return true
  }

  return {
    isLoading,
    isError: error,
    posts: posts,
    hasNext,
    nextPage,
  };
}

export default usePosts;