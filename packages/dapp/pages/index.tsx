import type { NextPage } from 'next'
import Head from 'next/head'
import type { BasicProfile } from "@datamodels/identity-profile-basic";

import styles from '../styles/Home.module.css'
import { Button, Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import ReferencesRanked from '../src/components/reference/ReferencesRanked';

type BasicProfileResponse = {
  viewer: {
    basicProfile?: BasicProfile;
  }
}

/**
 * 
 * @returns 
 */
const Home: NextPage = () => {
  const bg = useColorModeValue(
    'linear-gradient(122deg, rgba(33,140,225,1) 0%, rgba(248,245,255,1) 35%, rgba(137,158,250,1) 100%)',
    'linear-gradient(122deg, rgba(33,140,225,1) 0%, rgba(66,90,242,1) 35%, rgba(137,158,250,1) 100%)',
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Comm3nts</title>
        <meta name="description" content="Web3 Comm3nts on top of ceramic/orbis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={styles.main}> */}
      <Flex
        maxW='100%'
        minH='calc(100vh - 63px)'
        // bgGradient={bg}
        // alignContent="center"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Container
          maxW="8xl"
        >
          <ReferencesRanked />
          {/* <Card>

          </Card> */}
        </Container>
      </Flex>
      {/* <footer className={styles.footer}>
        <div>
          <a href="https://developers.ceramic.network" target="_blank" rel="noreferrer">
            Learn about Ceramic
          </a>
        </div>
        <div>
          <a href="https://forum.ceramic.network" target="_blank" rel="noreferrer">
            Ask Questions
          </a>
        </div>
      </footer> */}
    </div>
  );
}

export default Home
