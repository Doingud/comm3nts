import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, HStack, Image, LinkBox, LinkOverlay, Stack, Tag, Text } from "@chakra-ui/react";
import NextLink from 'next/link'
import { TriangleUpIcon } from '@chakra-ui/icons'
import useResolveReference from "../../hooks/useResolveReference";
import makeBlockie from 'ethereum-blockies-base64';

function ReferenceCard ({reference, variant}: any) {
  const { metadata } = useResolveReference(reference);

  return (
    <LinkBox>
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      justifyContent="space-between"
      // variant='outline'
      my="12"
      borderWidth='1px'
      borderColor='transparent'
      background='linear-gradient(white, white) padding-box, linear-gradient(134.64deg, #DEF0FA 0%, #7ADEFF 38.02%, #4188F7 63.54%, #8343F6 89.06%) border-box;'
      boxShadow="sm"
      // borderRadius="lg"
      // variant="outline"
      // boxShadow="lg"
      // bgColor="ghostwhite"
    >
      {/* <Flex
        direction="column"
        minW="10"
        justifyItems="stretch"
        boxShadow="dark-lg"
      >
        <span>i</span>
        <span>i</span>
        <span>i</span>
      </Flex> */}
      <Image
        h="86px"
        w="86px"
        mx="4"
        my="4"
        borderRadius="4"
        alignSelf="center"
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={metadata?.pfp || makeBlockie(reference?.context ||reference?.contextId || reference?.ref || 'anon')}
        alt={metadata?.description || metadata?.name || reference?.contextId || reference?.context}
      />
      <Stack justifySelf="flex-start" flex='1'>
        <CardBody textAlign='left' pb="2">
          <HStack>
            <Heading size='sm' maxInlineSize="lg">{metadata?.name || reference.contextId || reference?.context}</Heading>
            {metadata?.kind && 
              <Tag
                background='linear-gradient(134.64deg, #DEF0FA 0%, #7ADEFF 38.02%, #4188F7 63.54%, #8343F6 89.06%)'
                fontWeight='bold'
                textTransform='uppercase'
              >
                {metadata?.kind}
              </Tag>
            }
          </HStack>
          
          <Text py='2'>
            {(metadata?.description?.length > 130 ? `${metadata?.description.slice(0, 129)}...` : metadata?.description ) || 'no description'}
            {/* Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk. */}
          </Text>
          <LinkOverlay
            as={NextLink}
            href={`/context/${encodeURIComponent(reference?.context || reference?.contextId || reference?.ref)}`}
            passHref
          >
            view
          </LinkOverlay>
        </CardBody>

        {/* <CardFooter pt="2" pb="6">
          <HStack>
            <ChatIcon boxSize={6} gap="4" />
            <Text  as='b' fontSize="md" >{reference.nbpost}</Text>
          </HStack>
        </CardFooter> */}
      </Stack>
      <Box mt="4" mr="4">
        <Flex
          direction="column"
          border="1px"
          borderColor="gray.300"
          borderRadius="4"
          minW="16"
          alignItems="center"
        >
          <TriangleUpIcon boxSize={5} color="gray.600" flex="1" m="2"/>
          <Text flex="1" m="2" as='b' fontSize="md" color="gray.600">{reference.nbpost || '-'}</Text>
          {/* <Button variant='solid' colorScheme='blue' justifySelf="flex-end">
            Open
          </Button> */}
        </Flex>
      </Box>
    </Card>
    </LinkBox>
  )
}

export default ReferenceCard;