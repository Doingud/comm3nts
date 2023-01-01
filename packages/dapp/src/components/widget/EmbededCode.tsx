import { Box, Button, Card, CardBody, CardHeader, Code, Container, Flex, Heading, Stack, Textarea, useColorModeValue } from "@chakra-ui/react"
import { useRef } from "react";
import { IWidget } from "../../utils/comm3nt"

const EmbededCode = ({
  widget,
  size = {
    w: 800,
    h: 500,
  },
  type = 'widget',
}: {
  widget: IWidget;
  size: {
    w: number;
    h: number;
  },
  type: 'widget' | 'link'
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  // const host = 'http://localhost:3000';
  const host = process.env.NEXT_PUBLIC_HOST || 'https://comm3nts.xyz';

  const bg = useColorModeValue('white', 'gray.700')

  const copyTextToClipboard = () => {

    const context = ref?.current;
    context?.select();
    document.execCommand("copy");
  }

  // if (type === 'link') {
  //   return (
  //     <Card>
  //       <CardBody>
  //         <Code>
  //           {`${host}/embed/${widget.id}`}
  //         </Code>
  //       </CardBody>
  //     </Card>
  //   )
  // }
  return (
    <Container
      p='4'
      variant='outline-gradiant'>
    <Card variant='filled'>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
        
          <Heading size='md'>
            {type === 'widget' ? 'Embed Widget' : 'Embed Link'}
          </Heading>
          <Button onClick={copyTextToClipboard}>
            Copy
          </Button>
        </Flex>
      </CardHeader>
      <CardBody mb="4">
        <Flex justifyContent="center">
          <Code maxW="320" border="0" size='sm' padding='4'  ref={ref}>
            {type === 'widget' && 
              <>
                {`<iframe src="${host}/embed/${widget.id}" height="${size.h}px" width="${size.w}px" frameBorder="0"></iframe>`}
              </>
            }
            {type === 'link' &&
              <>{host}/embed/${widget.id}</>
            }
          </Code>
        </Flex>
      </CardBody>
    </Card>
    </Container>
  );
}

export default EmbededCode