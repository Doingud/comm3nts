import { Button, Center, Heading, StackDivider, VStack } from '@chakra-ui/react';
import ReferenceCard from '../../reference/ReferenceCard';
import { useFormikContext } from 'formik';
import parseReference, { flatten } from '../../../utils/reference';
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
  const formik = useFormikContext<any>();
  const { values, submitForm, setValues } = formik;

  if(typeof values?.ref === 'string') {
    const { kind, ref} = parseReference(values?.ref)
    setValues({
      ...values,
      ref: flatten(ref)
    })
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
    {values?.contextId &&
      <ReferenceCard reference={values} />
    }
   </VStack>
  )
}

export default ReferenceKind;