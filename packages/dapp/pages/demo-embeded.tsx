import { Container } from "@chakra-ui/react";
import Preview from "../src/components/widget/Preview";

function demo () {
  return (
    <Container 
      width="100vw"
      maxWidth="100vw"
      height="100vh"
      padding='0'
      // bgGradient="linear-gradient(122deg, rgba(33,140,225,1) 0%, rgba(104,255,92,1) 35%, rgba(137,158,250,1) 100%)"
      bgGradient="linear-gradient(122deg, rgba(33,140,225,1) 0%, rgba(248,245,255,1) 35%, rgba(137,158,250,1) 100%)"
    >
      <Preview widgetId="kjzl6kcym7w8y9euham4il71xqkeuupdxpdqcrv6qomhkk8e45t5xri7i9nyafn"></Preview>
    </Container>
  )
}

export default demo;