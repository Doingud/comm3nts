import { Container } from "@chakra-ui/react";
import Comm3ntsWidget from "../../src/components/comments";
import { useCeramicContext } from "../../context";
import { useRouter } from "next/router";
import { IChannelType } from "../../src/utils/comm3nt";

const Context = () => {
  const { state: { composeClient } } = useCeramicContext();
  const { query: { contextId } } = useRouter()
  const decodedContext = decodeURIComponent(contextId as string)

  if(!contextId) return <>Not Found</>;
  const widget = {
    name: decodedContext,
    ref: decodedContext,
    reverse: false,
    channels: [{
      type: IChannelType.PUBLIC,
      name: decodedContext,
      contextId: decodedContext,
      ref: decodedContext,
    }]
  }

  return (
    <Container 
      bgColor={'transparent'}
      // height='calc(100vh - 63px)'
      height='100vh'
      overflowY={'scroll'}
      mx='auto' 
      maxW='1440px' 
      // maxWidth='8xl'
      p='0'
    >
      {widget &&
        <Comm3ntsWidget widget={widget}></Comm3ntsWidget>
      }
    </Container>
    )
  }

export default Context;