import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRef } from "react";
import { IChannel } from "../../utils/comm3nt";
import Channel from "./channel";

function Channels({
  widget,
}: {
  widget: any;
}) {

  const ref = useRef<HTMLElement>()
  return (
    <Box flex='1' h='100%' overflowY='auto' overflowX='hidden'>
      <Tabs colorScheme='blue' isLazy>
        <TabList 
          pos='sticky'
          ref={ref}
          top='0'
          zIndex='5'
          bg='white'
          _dark={{ bg: 'gray.800' }}
          left='0'
          right='0'
          border={'0'}
        >
          {widget.channels.map((channel: IChannel, index: number) => (
            <Tab key={`channel-tab-${index}`}>{channel.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {widget.channels.map((channel: IChannel, index: number) => (
            <TabPanel
              px="0"
              pt='0'
              key={`channel-pannel-${index}`}>
              <Channel channel={channel} widget={widget} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Channels;