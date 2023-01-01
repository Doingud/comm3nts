import { Container } from "@chakra-ui/react";
import Comm3ntsWidget from "../../src/components/comments";
import useWidget from "../../src/hooks/useWidget";
import { useRouter } from "next/router";

const Embeded = () => {
  const { query: { streamId } } = useRouter()
  const { widget } = useWidget(streamId as string)

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

export default Embeded;