import { Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, Heading, StackDivider, useRadio, useRadioGroup, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'blue.500',
          color: 'white',
          borderColor: 'blue.400',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

function WidgetReferenceKind (props: any) {
  const formik = useFormikContext<any>();
  const { values, submitForm } = formik;
  const options = ['url', 'nft', 'token', 'address', 'transaction', 'block'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'kind',
    defaultValue: values?.kind || 'nft',

  })

  const group = getRootProps();
  return (
    <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
     <Heading size='md'>
      What would you like to talk about ?
     </Heading>
     <Field 
      name='kind'>
      {({ field, form, meta }: FieldProps) => (
        <FormControl isInvalid={!!meta.error && !!meta.touched}>
          <Wrap {...field} {...group}>
            {options.map((value) => {
              const radio = getRadioProps({ value })
              return (
                <WrapItem key={value}>
                  <RadioCard {...radio}>
                    {value}
                  </RadioCard>
                </WrapItem>
              )
            })}
          </Wrap>
          <FormHelperText>Helping you getting things organized.</FormHelperText>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
    <Center gap='4'>
        <Button
          onClick={props?.previousStep}
        >
          Previous
        </Button>
        <Button
          onClick={props?.nextStep}
        >
          Next
        </Button>
    </Center>
   </VStack>
  )
}

export default WidgetReferenceKind;