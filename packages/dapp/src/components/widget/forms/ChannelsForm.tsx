import { Container, Card, CardHeader, Flex, Stack, Heading, Tag, Button, Collapse, CardBody, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Select, Box } from "@chakra-ui/react";
import { Field, FieldArray, FieldProps, useFormikContext } from "formik";
import { useState } from "react";
import { IChannel, IWidget } from "../../../utils/comm3nt";

function validateName(value: string) {
  let error
  if (!value) {
    error = 'Name is required'
  }
  return error
}

const ChannelForm = ({
  channel,
  remove,
  index,
}: {
  channel: IChannel;
  remove: Function;
  index: number,
}) => {
  const [edit, setEdit] = useState(false)
  const handleToggle = () => setEdit(!edit)
  
  return (
    <Box marginY='1rem'>
      <Card ml='2' variant='outline'>
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Stack direction="row">
              <Heading as='h4' size='md'>{channel.name}</Heading>
              <Tag colorScheme={channel.type === 'PRIVATE' ? 'red' : 'teal'}>{channel.type.toLowerCase()}</Tag>
            </Stack>
            <Button
              // mt={4}
              // colorScheme='red'
              onClick={() => handleToggle()}
              type='button'
            >
              {edit ? 'Close' : 'Edit'}
            </Button>
          </Flex>
        </CardHeader>
          <Collapse startingHeight={0} in={edit} >
            <CardBody>
              <Field
                validate={validateName}
                name={`channels.${index}.name`}>
                {({ field, form, meta }: FieldProps) => {
                  return (
                  <FormControl isInvalid={!!meta.error && !!meta.touched}>
                    <FormLabel>Channel Name</FormLabel>
                    <Input {...field} placeholder='name' />
                    <FormHelperText>Name of this channel.</FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}}
              </Field>
              <Field 
                name={`channels.${index}.contextId`}>
                {({ field, form, meta }: FieldProps) => (
                  <FormControl isInvalid={!!meta.error && !!meta.touched}>
                    <FormLabel>Channel contextId</FormLabel>
                    <Input {...field} placeholder='contextId' />
                    <FormHelperText>contextId of this channel.</FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field 
                name={`channels.${index}.type`}>
                {({ field, form, meta }: FieldProps) => (
                  <FormControl isInvalid={!!meta.error && !!meta.touched}>
                    <FormLabel>Channel type</FormLabel>
                    <Select {...field}>
                      <option value='PUBLIC'>Public comm3nts</option>
                      <option value='PRIVATE'>Private comm3nts</option>
                    </Select>
                    <FormHelperText>type of this channel.</FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme='red'
                onClick={() => remove(index)}
                type='button'
              >
                X
              </Button>
            </CardBody>
          </Collapse>
        </Card>
      </Box>
  )
}

function ChannelsForm (props: any) {
  const { values, submitForm, isSubmitting} = useFormikContext<IWidget>();
  return (
    <>
    {/* <Card variant='outline' p='6' py='0' my='12'> */}
      <FieldArray name="channels">
      {({ insert, remove, push }) => (
        <>
          {values?.channels?.length > 0 &&
            values?.channels?.map((channel: IChannel, index: number) => (
            <ChannelForm key={index} channel={channel} remove={remove} index={index} />
            ))}
          <Container>
            <Button
              mt={4}
              colorScheme='gray'
              onClick={() => push({ name: '', contextId: '', type: 'PUBLIC' })}
              type='button'
            >
              Add Channel
            </Button>
          </Container>
        </>
      )}
      </FieldArray>
      {/* </Card> */}
      <Button
        mt={4}
        colorScheme='teal'
        isLoading={isSubmitting}
        type='submit'
        onClick={submitForm}
      >
        Submit
      </Button>
    </>
  )
}

export default ChannelsForm;