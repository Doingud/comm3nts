import { Box, Button, Card, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Switch} from '@chakra-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect } from 'react';
import parseReference, { getNftCollection, getOpenGraph } from '../../../utils/reference';
import { supportedChains } from '../../../utils/web3api';
import ReferenceKind from '../steps/ReferenceKind';
import WidgetReferenceKind from '../steps/WidgetReferenceKind';

function WidgetSettingsForm () {

  const { submitForm, isSubmitting } = useFormikContext();
  return (
    <>
      <Card variant='outline' p='6' py='0' my='12'>
        <WidgetReferenceKind />
        <ReferenceKind />
      </Card>
      <Card variant='outline' p='6' py='0' my='12'>
        <Field name='name'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Name</FormLabel>
              <Input {...field} placeholder={field.value} maxW='48' />
              {/* <FormHelperText></FormHelperText> */}
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Divider orientation='horizontal' borderColor='lightgrey' />
        <Field name='appearance'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Appearance</FormLabel>
              <Input {...field} placeholder={field.value} type='number' maxW='12' />
              {/* <FormHelperText></FormHelperText> */}
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Divider orientation='horizontal' borderColor='lightgrey' />
        <Field name='height'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Height</FormLabel>
              <FormHelperText>Min 320 / Max 900</FormHelperText>
              <Input {...field} placeholder={field.value} type='number' maxW='32' />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name='width'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Width</FormLabel>
              <FormHelperText>Min 320 / Max 1440</FormHelperText>
              <Input {...field} placeholder={field.value} type='number' maxW='32' />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Divider orientation='horizontal' borderColor='lightgrey' />
        <Field name='avatar'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Avatar</FormLabel>
              {/* <FormHelperText>Min 320 / Max 1440</FormHelperText> */}
              <Switch {...field} isChecked={field.value} size="lg" />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Divider orientation='horizontal' borderColor='lightgrey' />
        <Field name='cardLayout'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Card position layout</FormLabel>
              {/* <FormHelperText>Min 320 / Max 1440</FormHelperText> */}
              <Switch {...field} isChecked={field.value} size="lg" />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name='voteLayout'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Vote layout</FormLabel>
              {/* <FormHelperText>Min 320 / Max 1440</FormHelperText> */}
              <Switch {...field} isChecked={field.value} size="lg" />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name='replyBoxLayout'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Reply box layout</FormLabel>
              {/* <FormHelperText>Min 320 / Max 1440</FormHelperText> */}
              <Switch {...field} isChecked={field.value} size="lg" />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name='topToBottom'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Top to bottom</FormLabel>
              {/* <FormHelperText>Min 320 / Max 1440</FormHelperText> */}
              <Switch {...field} isChecked={field.value} size="lg" />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Divider orientation='horizontal' borderColor='lightgrey' />
        <Field name='showLogo'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Show Comm3nts logo</FormLabel>
              {/* <FormHelperText>Min 320 / Max 1440</FormHelperText> */}
              <Switch {...field} isChecked={field.value} size="lg" />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Divider orientation='horizontal' borderColor='lightgrey' />
        <Field name='lng'>
          {({ field, form, meta }: FieldProps) => (
            <FormControl isInvalid={!!meta.error && !!meta.touched} variant='columns'>
              <FormLabel fontWeight='bold'>Language</FormLabel>
              {/* <FormHelperText>Min 320 / Max 1440</FormHelperText> */}
              <Switch {...field} isChecked={field.value} size="lg" />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Card>
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

export default WidgetSettingsForm;
