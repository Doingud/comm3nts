import { useEffect, useState } from "react";
import { useCeramicContext } from "../../../context";
import NextLink from 'next/link';
import { Box, LinkBox, LinkOverlay, SimpleGrid } from "@chakra-ui/react";
import { getWidgets } from "../../utils/comm3nt";
import ReferenceCard from "../reference/ReferenceCard";


const WidgetList = ({
  did
}: {
  did: string;
}) => {
  const [widgets, setWidgets] = useState<any>(null)
  const { state: { composeClient, did: contextDID } } = useCeramicContext()

  const fetchWidgets = async () => {
    if(contextDID?.authenticated !== undefined) {
      const { widgets, pageInfo } = await getWidgets(composeClient, did)
      setWidgets(widgets)
    }
  }

  useEffect(() => {
    if(did !== undefined) {
      fetchWidgets();

    }
  }, [did]);
  return (
    <>
        <SimpleGrid
          // bg='gray.50'
          columns={{ sm: 2, md: 4 }}
          spacing='8'
          p='10'
          textAlign='center'
          rounded='lg'
          color='gray.400'
          >
        {widgets && widgets.map((widget: any) => {
          return (
            <LinkBox bg={'Background'} as='article' maxW='sm' p='5' borderWidth='1px' rounded='md' boxShadow='lg' key={widget.node.id} >
              <Box
              // boxShadow='inner' p='6' rounded='md' bg='white'
              >
                {widget?.node?.ref &&
                  <ReferenceCard reference={{context: widget?.node?.ref}}></ReferenceCard>
                }
                <p>{widget.node.name}</p>
                <p>Channels nb: {widget.node.channels.length}</p>
                <LinkOverlay
                  as={NextLink}
                  href={`/widgets/${widget.node.id}`}
                  passHref
                >
                  view
                </LinkOverlay>

              </Box>
            </LinkBox>
          );
        })}
      </SimpleGrid>
    </>
  )
}

export default WidgetList;