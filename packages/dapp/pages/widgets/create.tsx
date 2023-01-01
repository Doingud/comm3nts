import type { NextPage } from 'next'

import { 
  Box, 
  Center,
  Container
} from '@chakra-ui/react'
import WidgetCreateStepper from '../../src/components/widget/WidgetCreateStepper'

/**
 * 
 * @returns Load widget configurator for new widget instance or existing widget instance
 */
const WidgetCreate: NextPage = () => {

  return (
    <>
      <Box 
        // display={{ sm: "block", xl: "block" }}
        h='calc(100vh - 63px)'
        w='100vw'
      >
        <Center h='100%'>
          <Container
            variant='outline-gradiant'
          >
            <WidgetCreateStepper />
          </Container>
        </Center>
      </Box>
    </>
  );
}

export default WidgetCreate
