import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Collapse, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon, ChatIcon } from '@chakra-ui/icons'
import { useEffect } from "react";
import { useCeramicContext } from "context";
import { formatDistance, } from 'date-fns'
import { fetchReactions } from "utils/comm3nt";

function CommentContent({
  post,
  footer,
}: {
  post: any;
  footer?: any;
}) {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)
  return (
    <>
      <CardHeader>
        <Flex gap='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={post.creator_details?.profile?.username} src={post.creator_details?.profile?.pfp} />
            <Box>
              <Heading size='sm'>{post.creator_details?.profile?.username}</Heading>
              <Text>{post.creator_details?.profile?.description}</Text>
            </Box>
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<ChevronDownIcon />}
          />
        </Flex>
        <Heading as='h5' size='sm'>
          {post.content.title}
        </Heading>
      
      </CardHeader>
      <CardBody>
        {post.content.body.length > 200 && 
          <Collapse startingHeight={40} in={show} >
            <Text fontSize='sm'>{post.content.body}</Text>
          </Collapse>
        }
        {post.content.body.length <= 200 &&
          <Text fontSize='sm'>{post.content.body}</Text>
        }
      </CardBody>
      <CardFooter>
        {footer}
        <Flex>
          {formatDistance(new Date(post.timestamp * 1000), new Date(), { addSuffix: true })}
        </Flex>
        {post.content.body.length > 200 && 
          <Flex flex='1' justifyContent='flex-end' mr='1.1rem'>
            <Button size='sm' onClick={handleToggle}>
              Show {show ? 'Less' : 'More'}
            </Button>
          </Flex>
        }
      </CardFooter>
    </>
  );
}

function Replies({
  replies
}: {
  replies: any;
}) {
  return (
    replies?.map((post: any) => {
      return (
        <Card left={'var(--chakra-space-8)'} w={'calc(100% - var(--chakra-space-8))'} key={post.stream_id} size='sm'>
          <CommentContent post={post} />
        </Card>

      )
    })
  );
}

function Comment({
  post,
}: {
  post: any;
}) {
  const { state: { orbis } } = useCeramicContext()
  const [replies, setReplies] = useState<any>()
  
  const fetchReplies = async (master: string) => {
    
    const { data: replies, error } = await orbis.getPosts({
      master,
    });
    setReplies(replies);
    return replies;
  }

  useEffect(() => {
    if (post) {
      fetchReplies(post.stream_id)
      fetchReactions(orbis, post.stream_id)
    }
  }, [post])

  return (
    <>
      <Card size='sm' marginY='1rem'>
        <CommentContent 
          post={post}
          footer={
            <Flex flex='1'>
              <Text as='b' mr={'.5rem'} lineHeight={'10px'}>
                {replies?.length}
              </Text>
              <ChatIcon />
            </Flex>
          }
        />
      </Card>
      <Replies replies={replies} />
    </>
  )
}

export default Comment;