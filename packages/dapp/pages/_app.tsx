import '../styles/globals.css'

import {CeramicWrapper} from "../context";
import type { AppProps } from 'next/app';
import { ChakraProvider, SlideFade } from '@chakra-ui/react';
import theme from '../theme';
import Header from '../src/components/header';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CeramicWrapper>
        {router.route !== '/embed/[streamId]' &&
          <Header isembed={router.route === '/embed/[streamId]'} />
        }
        <SlideFade
          key={router.route}
          // initialScale={0.9}
          offsetY='-64'
          in
        >
          <Component {...pageProps} ceramic />
        </SlideFade>
      </CeramicWrapper>
    </ChakraProvider>
  );
}

export default MyApp