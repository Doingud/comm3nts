import { Button, Center, FormControl, FormErrorMessage, FormHelperText, Heading, Input, Select, StackDivider, VStack } from '@chakra-ui/react';
import ReferenceCard from '../../reference/ReferenceCard';
import FormikStepper from '../../Stepper';
import { Field, FieldProps, Form, Formik, useFormikContext } from 'formik';
import { useEffect } from 'react';
import parseReference, { flatten, getNftCollection } from '../../../utils/reference';
import { supportedChains } from '../../../utils/web3api';
import NFTForm from '../forms/NFTForm';
import URLForm from '../forms/URLForm';

function RenderKindForm (kind: string) {
  switch (kind) {
    case 'nft':
      return <NFTForm />
    case 'url':
      return <URLForm />
    // case 'token':
      // return <TokenForm />
    case 'nft':
      return <NFTForm />
  
    default:
      break;
  }
}

function ReferenceKind (props: any) {
  const formik = useFormikContext();
  const { values, submitForm } = formik;
  if(typeof values?.ref === 'string') {
    const { kind, ref} = parseReference(values?.ref)

    values.ref = flatten(ref)
  }
  return (
    <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
     <Heading size='md'>
      Configure {values?.kind}
     </Heading>
     {RenderKindForm(values?.kind)}
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
    {values?.context &&
      <ReferenceCard reference={values} />
    }
   </VStack>
  )
}

export default ReferenceKind;