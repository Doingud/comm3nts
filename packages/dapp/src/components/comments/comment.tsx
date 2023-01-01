import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, ChakraComponent, Collapse, Flex, Heading, HStack, Icon, IconButton, Slide, Tag, TagLabel, TagLeftIcon, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon, ChatIcon, StarIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { useEffect } from "react";
import { useCeramicContext } from "../../../context";
import { formatDistance, } from 'date-fns'
import { fetchReactions } from "../../utils/comm3nt";
import useCredentials from "../../hooks/useCredentials";
import { shortRef } from "../../utils/reference";
import { LikeIcon, ReplyIcon, DownvoteIcon, UpvoteIcon } from '../icons'

function Reactions({ post, toggleReplies }: {
  post: any;
  toggleReplies: Function;
}) {
  // console.log('reactions', Object.keys(post));
  const accepts = [
    'likes',
    'replies',
    'downvotes',
    'upvotes',
  ]
  const reactions = Object.keys(post).reduce((reactions: any[], key: string) => {
    if(key.split('_')?.[0] === 'count') {
      if(accepts.indexOf(key.split('_')?.[1]) > -1) {
        reactions.push({
          name: key.split('_')?.[1],
          count: post[key],
        })
      }
    }
    return reactions;
  }, [])

  function renderIcon(name: string) {
    switch (name) {
      case 'likes':
        return <Icon as={LikeIcon} />
      case 'replies':
        return <Icon as={ReplyIcon} />
      case 'haha':
        return <ChatIcon />
      case 'downvotes':
        return <Icon as={DownvoteIcon} />
      case 'commits':
        return <ChatIcon />
      case 'upvotes':
        return <Icon as={UpvoteIcon} />
    
      default:
        // return <ChatIcon />
    }
  }
  return(
    <>
    {reactions.map(reaction => (
        <Flex key={`${post.streamId}-${reaction.name}`} flex='1' alignItems='center' maxW='12' onClick={() => {
          console.log('click reaction', reaction.name)
          toggleReplies()
          }}>
          {/* <Text as='b' mr={'.5rem'} lineHeight={'10px'}>
            {reaction.name}
          </Text> */}
          {renderIcon(reaction.name)}
          <Text as='b' ml={'.5rem'} lineHeight={'10px'}>
            {reaction.count}
          </Text>
      </Flex>
      ))}
        </>
  )
}

function CommentContent({
  post,
  footer,
}: {
  post: any;
  footer?: any;
}) {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)
  const { credentials } = useCredentials(post.creator_details.did)

  return (
    <Flex>
      <Box p='4'>
        <Avatar size='sm' name={post.creator_details?.profile?.username} src={post.creator_details?.profile?.pfp} />
      </Box>
      <Box w='100%'>
      <CardHeader pb='0' pt='2'>
        <Flex gap='2' alignItems='center'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box>
              <HStack>
                <Heading size='sm'>
                  {post.creator_details?.profile?.username || post.creator_details.metadata.ens || shortRef(post.creator_details.metadata.address)}
                </Heading>
                <Tag colorScheme='teal' size='sm'>
                  <TagLeftIcon as={CheckCircleIcon} />
                  <TagLabel>
                    {post.creator_details?.a_r}
                  </TagLabel>
                  <Text px='2'>|</Text>
                  <TagLeftIcon as={StarIcon} />
                  <TagLabel>
                    {credentials?.length || 0}
                  </TagLabel>
                </Tag>
              </HStack>
              <Text 
                fontSize='xs'
                color='gray.500'
              >{post.creator_details?.profile?.description}</Text>
            </Box>
          </Flex>
          <Flex>
            {formatDistance(new Date(post.timestamp * 1000), new Date(), { addSuffix: true })}
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<ChevronDownIcon />}
          />
        </Flex>
        {post.content.title &&
          <Heading as='h5' size='sm' pt='3' pb='0'>
            {post.content.title}
          </Heading>
        }
      
      </CardHeader>
      <CardBody
        py='0'
      >
        {post.content.body.length > 200 && 
          <Collapse startingHeight={40} in={show} >
            <Text fontSize='md'>{post.content.body}</Text>
          </Collapse>
        }
        {post.content.body.length <= 200 &&
          <Text fontSize='md'>{post.content.body}</Text>
        }
      </CardBody>
      <CardFooter>
        {footer}
        {post.content.body.length > 200 && 
          <Flex flex='1' justifyContent='flex-end' mr='1.1rem'>
            <Button size='sm' onClick={handleToggle}>
              Show {show ? 'Less' : 'More'}
            </Button>
          </Flex>
        }
      </CardFooter>
      </Box>
    </Flex>
  );
}

function Replies({
  replies,
}: {
  replies: any;
}) {
  return (
    <Box>
    {replies?.map((post: any) => {
      return (
        <Card
          left={'var(--chakra-space-16)'} w={'calc(100% - var(--chakra-space-16))'} 
          key={post.stream_id} 
          size='xs'
          variant="filled"
          borderTop="0px"
          borderLeft='1px'
          borderRadius="0"
          borderColor="gray.300"
          mx="0"
        >
          <CommentContent post={post} />
        </Card>

      )
    })}
    </Box>
  );
}

function Comment({
  post,
}: {
  post: any;
}) {
  const { state: { orbis } } = useCeramicContext()
  const [replies, setReplies] = useState<any>()
  const {isOpen: repliesOpen, onToggle: toggleReplies} = useDisclosure();
  const fetchReplies = async (master: string) => {
    
    const { data: replies, error } = await orbis.getPosts({
      master,
    });
    setReplies(replies);
    return replies;
  }

  useEffect(() => {
    if (post.count_replies > 0) {
      fetchReplies(post.stream_id)
      // fetchReactions(orbis, post.stream_id)
    }
  }, [post])
  

  return (
    <>
      <Card
        size='sm'
        marginBottom='1rem'
        variant="filled"
        borderTop="1px"
        borderRadius="0"
        borderColor="gray.300"
        mx="0"
        flex='1'
        // w='100%'
      >
        <CommentContent 
          post={post}
          footer={
            <Reactions post={post} toggleReplies={toggleReplies} />
          }
        />
      </Card>
      <Collapse in={repliesOpen} style={{ zIndex: 10 }}>
        <Replies replies={replies} />
      </Collapse>
    </>
  )
}

export default Comment;