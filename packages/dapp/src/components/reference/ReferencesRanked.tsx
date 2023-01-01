import { Box, Divider, Heading, Skeleton, Stack } from "@chakra-ui/react";
import useRankedReferences from "../../hooks/useRankedReferences";
import ReferenceCard from "./ReferenceCard";
import { format } from 'date-fns'
function ReferencesRanked () {
  const { isLoading, refMap } = useRankedReferences();

  return (
    <Box
      mx='auto' 
      maxW='4xl'
    >
      <Skeleton isLoaded={!isLoading}>
      {refMap && Object.keys(refMap).map((date, index) => {
        return (
        <Box 
          key={date}
          my="32"
        >
          <Heading size="lg" textAlign="left">
            Hot topics from {format(new Date(date), 'PP')}
          </Heading>
          <Divider mt="2"/>
          {refMap[date].map(reference => (
            <ReferenceCard 
              key={`${date}-${reference.context}`}
              reference={reference} 
              />
          ))}
        </Box>
        )
      })}
      </Skeleton>
    </Box>
  )
}

export default ReferencesRanked;