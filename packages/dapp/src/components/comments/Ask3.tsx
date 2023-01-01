import { Avatar, Box, Card, CardBody, Container, HStack, Popover, PopoverContent, PopoverTrigger, Tag, TagLabel } from "@chakra-ui/react";

function Ask3 ( ) {
  return (
    <Box p='4' overflowX='scroll'>
      <HStack spacing='2' w='max-content'>
      <Popover placement='bottom-start'>
      <PopoverTrigger>
        <Tag size='lg' colorScheme='blue' borderRadius='full'>
          <Avatar
            src='https://bit.ly/sage-adebayo'
            size='xs'
            name='Segun Adebayo'
            ml={-1}
            mr={2}
          />
          <TagLabel>0.1 ETH</TagLabel>
        </Tag>
      </PopoverTrigger>
      <PopoverContent>
        <Card>
          <CardBody>
            My message
          </CardBody>
        </Card>
      </PopoverContent>
      </Popover>
      <Tag size='lg' colorScheme='red' borderRadius='full'>
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='xs'
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        />
        <TagLabel>0.1 ETH</TagLabel>
      </Tag>
      <Tag size='lg' colorScheme='green' borderRadius='full'>
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='xs'
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        />
        <TagLabel>0.1 ETH</TagLabel>
      </Tag>
      <Tag size='lg' colorScheme='yellow' borderRadius='full'>
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='xs'
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        />
        <TagLabel>0.1 ETH</TagLabel>
      </Tag>
      <Tag size='lg' colorScheme='gray' borderRadius='full'>
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='xs'
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        />
        <TagLabel>0.1 ETH</TagLabel>
      </Tag>
      <Tag size='lg' colorScheme='cyan' borderRadius='full'>
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='xs'
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        />
        <TagLabel>0.1 ETH</TagLabel>
      </Tag>
      <Tag size='lg' colorScheme='purple' borderRadius='full'>
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='xs'
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        />
        <TagLabel>0.1 ETH</TagLabel>
      </Tag>
      <Tag size='lg' colorScheme='teal' borderRadius='full'>
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='xs'
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        />
        <TagLabel>0.1 ETH</TagLabel>
      </Tag>
      <Tag size='lg' colorScheme='orange' borderRadius='full'>
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='xs'
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        />
        <TagLabel>0.1 ETH</TagLabel>
      </Tag>
      </HStack>
    </Box>
  )
}

export default Ask3;