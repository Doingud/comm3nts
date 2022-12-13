import { useEffect, useState } from "react";
import { useCeramicContext } from "../../../context";
import NextLink from 'next/link';
import { Box, Button, Card, CardBody, CardHeader, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, LinkBox, LinkOverlay, Select, SimpleGrid } from "@chakra-ui/react";
import { ErrorMessage, Field, FieldArray, FieldProps, Form, Formik } from 'formik';
import { type IWidget, updateWidget, IChannel } from "utils/comm3nt";
import useAutenticate from "hooks/useAuthenticate";

const WidgetForm = ({
  widget,
  setWidget,
}: {
  widget: any;
  setWidget: any;
}) => {
  const { clients: { composeClient }, isAuthenticating, did, handleLogin } = useAutenticate()

  const save = async (widgetValues: IWidget) => {
    const update = await updateWidget(composeClient, widgetValues);
    console.log('widget updated', update);
    setWidget(widgetValues);
    return widgetValues;
  }

  function validateName(value: string) {
    let error
    if (!value) {
      error = 'Name is required'
    }
    return error
  }

  if (!did?.authenticated || did?.parent !== widget.author.id) {
    return (
      <>
        <p>Authenticate with the owner account of this stream to edit</p>
        <Button
          isLoading={isAuthenticating}
          onClick={() => {handleLogin}}
        >
          Login
        </Button>
      </>
    )
  }

  
  return (
    <Formik
      initialValues={widget}
      onSubmit={(values, actions) => {
        save(values).then(() => actions.setSubmitting(false));
      }}
    >
      {(props) => {
        return (
      <Form>
        <Container marginY='1rem'>
          <Field name='name' validate={validateName}>
            {({ field, form, meta}: FieldProps) => { 
              return (
                <FormControl isInvalid={!!!!meta.error && !!meta.touched}>
                  <FormLabel>Widget Name</FormLabel>
                  <Input {...field} placeholder='name' />
                  <FormHelperText>Name of this widget.</FormHelperText>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}}
          </Field>
        </Container>
        <FieldArray name="channels">
        {({ insert, remove, push }) => (
          <>
            {props.values.channels.length > 0 &&
              props.values.channels.map((channel: IChannel, index: number) => (
              <Container key={index} marginY='1rem'>
                <Card ml='2'>
                  <CardHeader>
                    <Heading>{channel.name}</Heading>
                  </CardHeader>
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
                  </Card>
                </Container>
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
        <Button
          mt={4}
          colorScheme='teal'
          isLoading={props.isSubmitting}
          type='submit'
        >
          Submit
        </Button>

      </Form>
      )}}
    </Formik>
  );
}

const WidgetConfiguration = ({
  streamId,
  widget,
  setWidget,
}: {
  streamId?: string;
  widget?: any;
  setWidget?: any;
}) => {

  return (
    <>
      <Container>
        <Box>
          {widget && 
            <>
              <Heading>{widget?.name}</Heading>
              <WidgetForm 
                widget={widget}
                setWidget={setWidget}
              />
            </>
          }
        </Box>
      </Container>
    </>
  )
}

export default WidgetConfiguration;