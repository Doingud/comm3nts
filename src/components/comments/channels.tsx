import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRef } from "react";
import { IChannel } from "utils/comm3nt";
import Channel from "./channel";

function Channels({
  widget,
}: {
  widget: any;
}) {

  const ref = useRef<HTMLElement>()
  return (
    <>
    <Tabs variant='soft-rounded' colorScheme='green' isLazy>
      <TabList 
        pos='sticky'
        ref={ref}
        top='0'
        zIndex='3'
        bg='white'
        _dark={{ bg: 'gray.800' }}
        left='0'
        right='0'
        paddingBlock='1rem'
      >
        {widget.channels.map((channel: IChannel, index: number) => (
          <Tab key={`channel-tab-${index}`}>{channel.name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {widget.channels.map((channel: IChannel, index: number) => (
          <TabPanel
            key={`channel-pannel-${index}`}>
            <Channel channel={channel} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
    </>
  )
}

export default Channels;