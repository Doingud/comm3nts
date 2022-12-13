import '../styles/globals.css'

import {CeramicWrapper} from "../context";
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CeramicWrapper>
        <Component {...pageProps} ceramic />
      </CeramicWrapper>
    </ChakraProvider>
  );
}

export default MyApp