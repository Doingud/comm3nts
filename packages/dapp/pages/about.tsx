import {
  Link as ChakraLink,
  Text,
  List,
  ListIcon,
  ListItem,
  Container,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

const Index = () => (
  <Container height="100vh">
    <Container>
      <Text color="text">
        A web3 first comment system.
      </Text>

      <List spacing={3} my={0} color="text">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://comm3nts.xyz"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://doingud.com" flexGrow={1} mr={2}>
            DoinGud <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Container>
  </Container>
)

export default Index