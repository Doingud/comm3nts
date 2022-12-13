import { Container } from "@chakra-ui/react";
import Channels from "components/comments/channels";
import { useCeramicContext } from "context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getWidget, IWidget } from "utils/comm3nt";

const Embeded = () => {
  const { state: { composeClient } } = useCeramicContext();
  const { query: { streamId } } = useRouter()
  const [ widget, setWidget ] = useState<IWidget | undefined>();
  
  const fetchWidget = async (stream : string) => {
    const widget = await getWidget(composeClient, stream);
    setWidget(widget);
  }
  useEffect(() => {
    if (streamId) {
      fetchWidget(streamId as string)
    }
  }, [streamId])

  return (
    <Container bgColor={'gray'} height="100vh" overflowY={'scroll'}>
      {widget &&
        <Channels widget={widget}></Channels>
      }
    </Container>
    )
  }

export default Embeded;