import { Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, StackDivider, Switch, VStack } from '@chakra-ui/react';

import { Field, FieldProps, useFormikContext } from 'formik';

function WidgetLayout (props: any) {
  const formik = useFormikContext();

  return (
    <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
     <Heading size='md'>
      Choose Layout
     </Heading>
     <Field 
      name='reverse'>
      {({ field, form, meta }: FieldProps) => (
        <FormControl isInvalid={!!meta.error && !!meta.touched}>
          <FormLabel>Use Reverse Layout ?</FormLabel>
          <Center>
            <Switch {...field} isChecked={field.value} size="lg" />
          </Center>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
          {/* <FormHelperText>Helping you getting things organized.</FormHelperText> */}
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

export default WidgetLayout;