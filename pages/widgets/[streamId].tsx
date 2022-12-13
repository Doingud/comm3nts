import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useCeramicContext } from '../../context'
import Header from '../../src/components/header'
import { 
  Grid,
  GridItem,
  Box 
} from '@chakra-ui/react'
import WidgetConfiguration from 'components/widget/WidgetConfiguration'
import Channels from 'components/comments/channels'

/**
 * 
 * @returns Load widget configurator for new widget instance or existing widget instance
 */
const WidgetDetails: NextPage = () => {
  const {state: { composeClient }} = useCeramicContext()
  const { query: { streamId } } = useRouter()
  const [widget, setWidget] = useState<any>()

  const fetchWidget = async (stream : string) => {
    const res = await composeClient.executeQuery(`
    query {
      node(id: "${stream}") {
        id
        ... on Comm3ntWidget {
          id
          name
          channels {
            type
            name
            contextId
          }
          author {
            id
          } 
        }
      }
    }
    `)
    const widget = res.data?.node as any
    setWidget(widget);
  }
  useEffect(() => {
    if (streamId) {
      fetchWidget(streamId as string)
    }
  }, [streamId])

  return (
    <>
      <Header />
      <Box display={{ sm: "block", xl: "block" }} position='fixed'>
        <Grid
          h='calc(100vh - 72px)'
          minH='100%'
          w='100vw'
          templateRows='repeat(1, 1fr)'
          templateColumns='repeat(6, 1fr)'
          gap={4}
        >
          <GridItem colSpan={2} overflowY='auto' >
            <WidgetConfiguration widget={widget} setWidget={setWidget}/>
          </GridItem>
          <GridItem colSpan={4} overflowY='auto'>
          {widget && 
            <Channels widget={widget} />
          }
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default WidgetDetails
