import { Container } from "@chakra-ui/react";
import { useState } from "react";

function Preview ({
  widgetId
}: {
  widgetId: string;
}) {
  const [ size , setSize ] = useState({
    w: 810,
    h: 500,
  })
  return (
    <Container width={`${size.w}px`} height={`${size.h}px`}>
      {/* <iframe width={'100%'} height={'100%'} src={`http://localhost:3000/embed/${widgetId}?customId=16`}></iframe> */}
      <iframe width={'100%'} height={'100%'} src={`http://localhost:3000/embed/${widgetId}`}></iframe>
    </Container>
  )
}

export default Preview;