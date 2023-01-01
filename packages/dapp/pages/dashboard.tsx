import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import type { BasicProfile } from "@datamodels/identity-profile-basic";

import { createWidget, IChannelType } from '../src/utils/comm3nt';
import WidgetList from '../src/components/widget/ListWidgets';
import useAuthenticate from '../src/hooks/useAuthenticate';
import { Button, Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { useCeramicContext } from '../context';

type BasicProfileResponse = {
  viewer: {
    basicProfile?: BasicProfile;
  }
}

/**
 * 
 * @returns 
 */
const Dashboard: NextPage = () => {
  const {state: {composeClient, did}} = useCeramicContext()
  const { handleLogin} = useAuthenticate()
  const [profile, setProfile] = useState<BasicProfile | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const bg = useColorModeValue(
    'linear-gradient(122deg, rgba(33,140,225,1) 0%, rgba(248,245,255,1) 35%, rgba(137,158,250,1) 100%)',
    'linear-gradient(122deg, rgba(33,140,225,1) 0%, rgba(66,90,242,1) 35%, rgba(137,158,250,1) 100%)',
  )

  const getProfile = async () => {
    setLoading(true)
    if(did !== undefined) {
      // const oProfile = await orbis.getProfile(did?.parent);

      const profile = await composeClient.executeQuery<BasicProfileResponse>(`
        query {
          viewer {
            basicProfile {
              id
              name
              description
              gender
              emoji
            }
          }
        }
      `);
      
      setProfile(profile?.data?.viewer.basicProfile)
      setLoading(false);
    }
  }
  
  const updateProfile = async () => {
    setLoading(true);
    if (did !== undefined) {
      const update = await composeClient.executeQuery(`
        mutation {
          createBasicProfile(input: {
            content: {
              name: "${profile?.name}"
              description: "${profile?.description}"
              gender: "${profile?.gender}"
              emoji: "${profile?.emoji}"
            }
          }) 
          {
            document {
              name
              description
              gender
              emoji
            }
          }
        }
      `);
      await getProfile();
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Comm3nts</title>
        <meta name="description" content="Web3 Comm3nts on top of ceramic/orbis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={styles.main}> */}
      <Flex
        maxW='100%'
        minH='calc(100vh - 63px)'
        bgGradient={bg}
        // alignContent="center"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Container
          maxW="8xl"
        >
          {!did?.authenticated &&
            <Button
              backgroundColor="pink.600"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
          }
          {did?.authenticated &&
            <>
              <Heading
                // color="gray.500"
              >
                Your Comm3nts Widgets
              </Heading>
              <div>
              <WidgetList
                did={did?.hasParent ? did?.parent : did?.id as string}/>
              
                {/* <Button
                  colorScheme='blackAlpha'
                  onClick={() => {
                    createWidget(composeClient, {
                      name: 'newWidget',
                      channels: [{
                        name: 'MyFirstChannel',
                        type: IChannelType.PUBLIC,
                        contextId: 'comm3nts',
                      }],
                    });
                  }}
                >
                  create widget
                </Button> */}
              </div>
            </>
          }
        </Container>
      </Flex>
    </div>
  );
}

export default Dashboard
