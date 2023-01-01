import { useEffect, useState } from "react";
import { useCeramicContext } from "../../../context";
import NextLink from 'next/link';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Collapse, Container, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, LinkBox, LinkOverlay, Select, SimpleGrid, Stack, Switch, Tag, useDisclosure } from "@chakra-ui/react";
import { ErrorMessage, Field, FieldArray, FieldProps, Form, Formik } from 'formik';
import { type IWidget, updateWidget, IChannel } from "../../utils/comm3nt";
import useAuthenticate from "../../hooks/useAuthenticate";

import parseReference, { resolveReference } from "../../utils/reference";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import WidgetSettingsForm from "./forms/WidgetSettingsForm";
import ChannelsForm from "./forms/ChannelsForm";
import { ChevronRightIcon } from "@chakra-ui/icons";
import EmbededCode from "./EmbededCode";
import SettingsBox from "./SettingsBox";
import useWidget from "../../hooks/useWidget";

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
    <Container marginY='1rem'>
      <Card ml='2'>
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
      </Container>
  )
}

const WidgetForm = ({
  widget,
  // setWidget,
}: {
  widget: any;
  // setWidget: any;
}) => {
  const { clients: { composeClient }, isAuthenticating, did, handleLogin } = useAuthenticate()
  const { mutate } = useWidget(widget.streamId);
  const save = async (widgetValues: IWidget) => {
    const update = await updateWidget(composeClient, widgetValues);

    // setWidget(widgetValues);
    mutate(widgetValues);
    return widgetValues;
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
          {/* <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='advanced' mb='0'>
              Advanced
            </FormLabel>
          <Switch id='advanced' />
          </FormControl> */}
        </Container>
        <Heading as="h4" size='md'>Channels</Heading>
        <Divider></Divider>
        <FieldArray name="channels">
        {({ insert, remove, push }) => (
          <>
            {props.values.channels.length > 0 &&
              props.values.channels.map((channel: IChannel, index: number) => (
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
  // setWidget,
}: {
  streamId?: string;
  widget?: any;
  // setWidget?: any;
}) => {
  const { clients: { composeClient }, isAuthenticating, did, handleLogin } = useAuthenticate()
  useEffect(() => {
    // resolveReference(parseReference('eip155:1'));
    // resolveReference(parseReference('eip155:1:0x9fd07f4ee4f18e27f9d958fb42e8ea2e6ee547bd'))
    // resolveReference(parseReference('https://louper.dev/diamond/0x1091d57a20ba1ffa823f08c8706ad924365bb9d6?network=rinkeby'))
    // resolveReference(parseReference('eip155:1/erc721'))
    // resolveReference(parseReference('0x34aa460834bc460834bc462c34aa462c00000000000000000000000000000000:general'))
    // resolveReference(parseReference('eip155:1/erc20:0x04c17b9d3b29a78f7bd062a57cf44fc633e71f85'))
    // resolveReference(parseReference('eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb'))
    // resolveReference(parseReference('eip155:1/erc721:0xAc5Aeb3b4Ac8797c2307320Ed00a84B869ab9333'))
    // resolveReference(parseReference('eip155:1/erc721:0xAc5Aeb3b4Ac8797c2307320Ed00a84B869ab9333'))
    // resolveReference(parseReference('eip155:1/erc721:0xAc5Aeb3b4Ac8797c2307320Ed00a84B869ab9333/198'))
    // resolveReference(parseReference('eip155:1/erc721:0xAc5Aeb3b4Ac8797c2307320Ed00a84B869ab9333@privateChannel'))

    // const ref = parseReference('eip155:1/erc721:0xAc5Aeb3b4Ac8797c2307320Ed00a84B869ab9333/108093@did#channelName')
    // const test = resolveReference(ref);

  }, [])

  function saveSettings(values: any) {

    return updateWidget(composeClient, {
      ...values,
      ref: values?.contextId,
    });
    return values;
  }
  
  function saveChannels(values: any) {

    return updateWidget(composeClient, values);
    // return values;
  }


  return (
    <Box>
        {widget &&
        <>
        <Container my='4'>
          <SettingsBox title='Widget Settings'>
            <Formik
              initialValues={widget}
              onSubmit={(values, actions) => {
                saveSettings(values).then(() => actions.setSubmitting(false));
              }}
            >
              <WidgetSettingsForm />
            </Formik>
          </SettingsBox>
        </Container>
        <Container my='4'>
          <SettingsBox title='Channels'>
            <Formik
              initialValues={widget}
              onSubmit={(values, actions) => {
                saveChannels(values).then(() => actions.setSubmitting(false));
              }}
            >
              <ChannelsForm />
            </Formik>
          </SettingsBox>
          </Container>
          </> 
        }
        {widget &&
        <Container my='4'>
          <SettingsBox title='Export'>
            <Stack gap="4">
              <EmbededCode type="widget" widget={widget} size={{h: 1, w: 1}}></EmbededCode>
              <EmbededCode type="link" widget={widget} size={{h: 1, w: 1}}></EmbededCode>
            </Stack>
          </SettingsBox>
        </Container>
        }
      </Box>
    // </Container>
  )
}

export default WidgetConfiguration;