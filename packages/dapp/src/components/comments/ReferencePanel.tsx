import { Box, Button, Card, CardBody, CardFooter, Center, Flex, Heading, HStack, Image, Stack, Tag, Text } from "@chakra-ui/react";
import { ChatIcon, TriangleUpIcon } from '@chakra-ui/icons'
import useResolveReference from "../../hooks/useResolveReference";
import makeBlockie from 'ethereum-blockies-base64';
import Header from "../header";

function ReferenceCard ({reference, ...props}: any) {
  const { metadata } = useResolveReference(reference);
  return (
    <Flex flex="1" {...props}>
      <Flex
        direction="column"
        w="100%"
        // h="100%"
        // alignItems="center"
        // alignContent="center"
        // justifyItems="center"
        // alignSelf="center"
        // justifySelf="center"
        // marginY="auto"
      >
          <Header
            isembed={true}
            // position='absolute'
          />
          <Image
            flex="1"
            // h="auto"
            w="auto"
            // mx="4"
            // my="4"
            borderRadius="8"
            // alignSelf="center"
            // justifySelf="center"
            // objectFit="contain"
            objectFit="cover"
            objectPosition="top"
            // maxW='max-content'
            // maxW={{ base: "100%", sm: "200px" }}
            maxH={{ base: "800px"}}
            src={metadata?.pfp || makeBlockie(reference?.context || reference?.ref || 'anon')}
            alt="Caffe Latte"
          />
          <Box
            w="100%"
            p="4"
            minH="16"
            mt="-16"
            backgroundColor="blackAlpha.600"
            alignItems="center"
          >
            <Heading
              fontSize="xl"
              color="white"
            >
              {metadata?.name}
            </Heading>
          </Box>
      </Flex>
    </Flex>
  )
}

export default ReferenceCard;