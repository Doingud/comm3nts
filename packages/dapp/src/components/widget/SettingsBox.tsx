import { Button, Collapse, Container, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { type ReactElement, type FC } from "react";

interface SettingsBoxProps {
  title: string;
  children?: ReactElement;
}
const SettingsBox:FC<SettingsBoxProps> = ({ children, title }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Container
      variant='outline-gradiant'
      p='8'
    >
      <Flex justifyContent="space-between" alignItems="baseline">
        <Heading as="h4" size='md'>{title}</Heading>
        <Button onClick={onToggle}>{isOpen ? 'Close' : 'Config'}</Button>
      </Flex>
      {/* <WidgetForm 
        widget={widget}
        setWidget={setWidget}
      /> */}
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </Container>
  )
}

export default SettingsBox;