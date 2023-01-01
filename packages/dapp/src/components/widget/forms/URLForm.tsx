import { FormControl, FormErrorMessage, FormHelperText, Input, Select} from '@chakra-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { getOpenGraph, IReference } from '../../../utils/reference';

function URLForm () {
  const { values, touched, setFieldValue } = useFormikContext<any>();
  const { ref } = values;

  useEffect(() => {
    async function fetchMetadata (address: string) {
      const ograph = await getOpenGraph(
        new URL(ref.address)
      );
      // if (collection?.result?.length > 0) {
        setFieldValue('contextId', values?.ref?.address);
      // }
    }
    // set the value of textC, based on textA and textB
    if (
      ref &&
      ref?.address
    ) {
      fetchMetadata(ref.address);
    }
  }, [ref, setFieldValue]);

  return (
    <>
      <Field 
        name='ref.address'>
        {({ field, form, meta }: FieldProps) => (
          <FormControl isInvalid={!!meta.error && !!meta.touched}>
            <Input {...field} placeholder='Website Url' />
            <FormHelperText></FormHelperText>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  )
}

export default URLForm;
