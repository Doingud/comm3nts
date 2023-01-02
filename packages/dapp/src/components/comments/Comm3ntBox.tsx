import { Avatar, Box, Button, ButtonGroup, Card, Container, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Tag, Textarea } from "@chakra-ui/react"
import { useRef } from "react";
import makeBlockie from 'ethereum-blockies-base64';
import { Field, FieldProps, Formik } from "formik";
import { shortRef } from "../../utils/reference";
import useResolveReference from "../../hooks/useResolveReference";
import { useCeramicContext } from "../../../context";
import { useSWRConfig } from "swr";
import { postComm3nt } from "../../utils/comm3nt";

function Comm3ntBox ({widget, channel}: {
  widget: any;
  channel:any;
}) {

  // const ref = useRef<HTMLElement>(null)
  const profile = {
    username: undefined,
    pfp: undefined,
  }
  const { state: { orbis, did } } = useCeramicContext()
  const { mutate } = useSWRConfig()

  const { metadata } = useResolveReference(channel?.ref ? channel : widget);



  async function submitPost(values: any) {
    await postComm3nt(orbis, channel, widget, values);
    mutate(key => {
      return Array.isArray(key) && key[0] === '/posts' && key[1] === channel.contextId
    })
    // mutate(key => Array.isArray(key) && key[0] === '/posts' && key[1] === channel.contextId)
    return values
  }

  return (
    <Container 
      // mx='auto'
      // px='0'
      maxW='8xl'
      top='10'
      zIndex='3'
      bg='white'
      // ref={ref}
      py='4'
      px='0'
      position='sticky'
      // maxWidth='4xl'
    >
      <Card 
        py='0'
        variant='unstyled'
      >
        <Grid
          // minH='60px'
          templateRows='repeat(1, auto 1fr)'
          rowGap='4'
          templateColumns='repeat(1, 56px 2fr 1fr)'
          gap={4}
          pr='8'
        >
          <GridItem
            rowSpan={3}
            colSpan={1}
          >
            <Box maxW='32' px='4'>
              <Avatar size='sm' name={profile?.username || '0xanon'} src={profile?.pfp || makeBlockie('0xanon')} />
            </Box>
          </GridItem>
          <GridItem>
            <Tag>{metadata?.kind}</Tag>
          </GridItem>
          <GridItem justifySelf='flex-end'>
            <Tag colorScheme='blue' title={did?.parent || did?.id || '-'}>{shortRef(did?.parent || did?.id || '-')}</Tag>
          </GridItem>
          <GridItem colSpan={2}>
            <Formik
              initialValues={{
                body: '',
              }}
              onSubmit={(values, actions) => {
                submitPost(values).then(() => actions.setSubmitting(false));
              }}
            >
                <Field name='body'>
                  {({ field, form, meta }: FieldProps) => (
                  <>
                    <FormControl isInvalid={!!meta.error && !!meta.touched}>
                      <Textarea {...field} 
                        placeholder='add a comm3nt'
                        // variant='unstyled'
                        size='sm'
                      />
                      {/* <FormHelperText></FormHelperText> */}
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                    {/* <Button
                      onClick={form.submitForm}
                    >
                      Submit
                    </Button> */}
                    <ButtonGroup size='sm' isAttached variant='outline' minW='100%'>
                      <Button flex={1} bgColor='blue.100' variant='solid' onClick={form.submitForm}>Post</Button>
                      <Button flex={1} bgColor='blue.500' color='white' variant='solid'>Ask@3</Button>
                    </ButtonGroup>
                  </>
                  )}
                </Field>
            </Formik>
          </GridItem>
          {/* <GridItem colSpan={2}>
          </GridItem> */}
        </Grid>
      </Card>
    </Container>
  )
}

export default Comm3ntBox