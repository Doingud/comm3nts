import { background, Container, Flex, FormControl, Grid, Input, Heading, useColorModeValue, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IWidget } from "../../utils/comm3nt";
import EmbededCode from "./EmbededCode";


type SizeType = {
  w: number;
  h: number;
}
function Preview ({
  widgetId,
  widget,
}: {
  widgetId?: string;
  widget?: IWidget;
}) {
  const defaultSize = {
    w: 1200,
    h: 800,
  }
  const [ size , setSize ] = useState<SizeType>(defaultSize);
  const ref = useRef(null);
  const bg = useColorModeValue('whiteAlpha.800', 'blackAlpha.800')


  return (
    <>
      <Container 
        width="100%"
        maxWidth="1440px"
        // height="100%"
        padding="0"
        // bgGradient="linear-gradient(122deg, rgba(33,140,225,1) 0%, rgba(104,255,92,1) 35%, rgba(137,158,250,1) 100%)"
        // bgGradient="linear-gradient(122deg, rgba(33,140,225,1) 0%, rgba(248,245,255,1) 35%, rgba(137,158,250,1) 100%)"
      >
       
        <Container
          bgColor={'transparent'}
          borderRadius="xl"
          overflow="hidden"
          width={`${size.w}px`}
          maxW={`${size.w}px`}
          height={`${size.h}px`}
          p="0"
          mx='8'
          paddingInline="0"
          boxShadow="xl"
          marginY="4"
          variant='outline-gradiant'
        >
          <iframe ref={ref} style={{background: 'transparent'}} width={'100%'} height={'100%'} src={
            // `http://localhost:3000/embed/${widgetId}`
            `${process.env.NEXT_PUBLIC_HOST || 'https://comm3nts.xyz'}/embed/${widgetId}`
            }></iframe>
        </Container>
      </Container>
    </>
  )
}

export default Preview;