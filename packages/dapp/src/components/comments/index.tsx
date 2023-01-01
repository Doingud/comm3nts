import { Box, Button, Collapse, Flex, IconButton, Slide, SlideFade, useDisclosure } from '@chakra-ui/react';
import ReferencePanel from './ReferencePanel';
import { IWidget } from '../../utils/comm3nt';
import Channels from './channels';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

function Comm3ntsWidget ({widget}: {widget: IWidget}) {
  const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true})

  return (
    <Flex h='100%'>
      <Box flex={1} hidden={!isOpen} h='100%'>  
      <SlideFade in={isOpen} reverse unmountOnExit offsetX='-320' offsetY='0' style={{height: '100%'}}>
        <ReferencePanel reference={widget} h='100%' />
      </SlideFade>
      </Box>
      <Box>
      <IconButton 
        onClick={onToggle}
        zIndex='100'
        aria-label='Open'
        icon={!isOpen ? <ArrowRightIcon /> : <ArrowLeftIcon />} 
        position={isOpen ? 'absolute': 'initial'}
        // position={'absolute'}
        right={'50%'}
        // right={isOpen ? '50%' : 'calc(100% - 36px)'}
      />
      </Box>
      {/* <Button onClick={onToggle} zIndex='100'>Click Me</Button> */}
      <Channels widget={widget} />
    </Flex>
  )  
}

export default Comm3ntsWidget