import { Button, Card, CardBody, Container, Stack, Text } from "@chakra-ui/react";
import { useCeramicContext } from "context";
import useMap from "hooks/useMap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Comment from './comment';

function Channel({
  channel,
}: {
  channel: any;
}) {
  const { state: { orbis } } = useCeramicContext();
  const { query: { customId } } = useRouter()
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);
  const [currentContext, setContext] = useState(channel?.contextId)
  const [posts, actions] = useMap(new Map());

  const fetchPosts = async (channel: any, page = 0) => {
    const options = {
      context: channel.contextId,
      // context: 'erc155:1:0x:898786',
      only_master: true,
      // algorithm: 'recommendations',
      // algorithm: 'all-posts-non-filtered',
    }
    if (customId) {
      options.context = `${channel.contextId}${customId}`;
    }
    const resp = await orbis.getPosts(options, page);
    setHasNext(resp.data.length === 50);
    
    resp.data.map((post: any) => actions.set(post.stream_id, post))

    return resp.data;
  }

  useEffect(() => {
    if (channel?.contextId) {
      fetchPosts(channel, page);
    }
  }, [page])

  useEffect(() => {
    if (channel?.contextId) {
      if (channel?.contextId !== currentContext) {
        setContext(channel.contextId)
        actions.reset();
      }
      fetchPosts(channel)
    }
  }, [channel])

  return (
    <Stack spacing='4'>
      <Container 
        mx='auto' 
        maxW='4xl' 
        maxWidth='4xl'
      >
        {/* <Heading>{channel.name} - {channel.contextId}</Heading> */}
        {posts.size === 0 &&
          <Card align='center' marginY='1rem'>
            {/* <CardHeader>
              <Heading size='md'> Customer dashboard</Heading>
            </CardHeader> */}
            <CardBody>
              <Text>Be the first to comment.</Text>
            </CardBody>
            {/* <CardFooter>
              <Button colorScheme='blue'>View here</Button>
            </CardFooter> */}
        </Card>
        }
        {Array.from(posts.entries()).map(([stream_id, post]) => (
          <Comment key={stream_id} post={post} />
        ))}
        {hasNext && 
          <Button onClick={() => setPage(page + 1)}>
            Load more
          </Button>
        }
      </Container>
    </Stack>
  )
}

export default Channel;