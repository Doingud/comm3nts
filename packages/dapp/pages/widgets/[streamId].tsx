import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { 
  Grid,
  GridItem,
  Box 
} from '@chakra-ui/react'
import WidgetConfiguration from '../../src/components/widget/WidgetConfiguration'
import Preview from '../../src/components/widget/Preview';
import useWidget from '../../src/hooks/useWidget'

/**
 * 
 * @returns Load widget configurator for new widget instance or existing widget instance
 */
const WidgetDetails: NextPage = () => {
  const { query: { streamId } } = useRouter()
  const { widget, isLoading } = useWidget(streamId as string);

  return (
    <>
      <Box display={{ sm: "block", xl: "block" }} position='fixed'>
        <Grid
          h='calc(100vh - 63px)'
          minH='100%'
          w='100vw'
          templateRows='repeat(1, 1fr)'
          templateColumns='minmax(340px, 480px) 1fr'
          gap={4}
        >
          <GridItem overflowY='auto' >
            <WidgetConfiguration widget={widget} />
          </GridItem>
          <GridItem overflowY='auto'>
          {widget && 
            <>
              <Preview widgetId={widget.id} widget={widget}></Preview>
              {/* <Channels widget={widget} /> */}
            </>
          }
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default WidgetDetails
