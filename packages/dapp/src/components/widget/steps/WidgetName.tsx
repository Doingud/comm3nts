import { Button, Center, FormControl, FormErrorMessage, FormHelperText, Heading, Input, StackDivider, VStack } from '@chakra-ui/react';
import FormikStepper from '../../Stepper';
import { Field, FieldProps, Form, Formik, useFormikContext } from 'formik';

function WidgetName (props: any) {
  const formik = useFormikContext();
  const { values, submitForm } = formik;

  return (
    <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
     <Heading size='md'>
      Name your widget
     </Heading>
     <Field 
      name='name'>
      {({ field, form, meta }: FieldProps) => (
        <FormControl isInvalid={!!meta.error && !!meta.touched}>
          <Input {...field} placeholder='name' />
          <FormHelperText>Helping you getting things organized.</FormHelperText>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
    <Center gap='4'>
        <Button
          onClick={props?.nextStep}
        >
          Next
        </Button>
    </Center>   
   </VStack>
  )
}

export default WidgetName;