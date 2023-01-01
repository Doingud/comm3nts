import { Button, Card, CardBody, Container, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Ask3 from "./Ask3";
import Comm3ntBox from "./Comm3ntBox";
import Comment from './comment';
import usePosts from "../../hooks/usePosts";

function Channel({
  channel,
  widget,
}: {
  channel: any;
  widget: any;
}) {
  const { query: { customId } } = useRouter()
  const { posts, nextPage, hasNext, isLoading } = usePosts(channel, customId as string);

  return (
    <Stack spacing='4'>
      <Container 
        // mx='auto'
        px='0'
        maxW='8xl' 
        // maxWidth='4xl'
      >
        <Ask3 />
        <Comm3ntBox
          widget={widget}
          channel={channel}
         />
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
          <Button 
            onClick={nextPage}
            isLoading={isLoading}
          >
            Load more
          </Button>
        }
      </Container>
    </Stack>
  )
}

export default Channel;