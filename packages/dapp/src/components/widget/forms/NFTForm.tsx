import { FormControl, FormErrorMessage, FormHelperText, Input, Select} from '@chakra-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect } from 'react';
import parseReference, { getNftCollection, getNft } from '../../../utils/reference';
import { supportedChains } from '../../../utils/web3api';

function NFTForm () {
  const { values, touched, setFieldValue } = useFormikContext<any>();
  const { ref } = values;
  // useEffect(() => {

  // }, values);
  useEffect(() => {
    async function fetchMetadata (chainId: string, address: string, tokenId: string) {
      
      if (tokenId) {
        const nft = await getNft(
          parseReference(chainId).ref,
          {reference: address, namespace: 'null'},
          tokenId,
        );

        if (nft) {
          setFieldValue('contextId', `${chainId}/${nft?.result?.contract_type?.toLowerCase()}:${address}/${tokenId}`);
        }
        return;
      }
      const collection = await getNftCollection(
        parseReference(chainId).ref,
        {reference: address, namespace: 'null'}
      );
      if (collection?.result?.length > 0) {
        setFieldValue('contextId', `${chainId}/${collection.result[0]?.contract_type?.toLowerCase()}:${address}`);
      }
    }
    // set the value of textC, based on textA and textB

    if (
      ref &&
      ref?.chainId &&
      ref?.assetReference
    ) {
      fetchMetadata( ref.chainId,  ref.assetReference, ref.tokenId || null);
    }
  }, [ref, setFieldValue]);

  return (
    <>
      <Field 
        name='ref.chainId'>
        {({ field, form, meta }: FieldProps) => (
          <FormControl isInvalid={!!meta.error && !!meta.touched}>
            <Select {...field} defaultValue='eip155:1'>
            {supportedChains.map(chain => {
              return (
              <option key={`eip155:${chain?.chainId}`} value={`eip155:${chain?.chainId}`}>{chain?.name}</option>
              )
            })}
            </Select>
            <FormHelperText></FormHelperText>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field 
        name='ref.assetReference'>
        {({ field, form, meta }: FieldProps) => (
          <FormControl isInvalid={!!meta.error && !!meta.touched}>
            <Input {...field} placeholder='Contract address' />
            <FormHelperText></FormHelperText>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field 
        name='ref.tokenId'>
        {({ field, form, meta }: FieldProps) => (
          <FormControl isInvalid={!!meta.error && !!meta.touched}>
            <Input {...field} placeholder='Token ID' />
            <FormHelperText></FormHelperText>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  )
}

export default NFTForm;