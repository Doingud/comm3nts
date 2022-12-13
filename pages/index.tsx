import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import type { BasicProfile } from "@datamodels/identity-profile-basic";

import { createWidget, IChannelType } from '../src/utils/comm3nt';
import styles from '../styles/Home.module.css'
import WidgetList from '../src/components/widget/ListWidgets';
import Header from '../src/components/header';
import useAutenticate from 'hooks/useAuthenticate';
import { Button } from '@chakra-ui/react';

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
  const { clients: { composeClient, orbis }, isAuthenticating, did, handleLogin} = useAutenticate()
  const [profile, setProfile] = useState<BasicProfile | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

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
    <div className={styles.container}>
      <Head>
        <title>Comm3nts</title>
        <meta name="description" content="Web3 Comm3nts on top of ceramic/orbis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={styles.main}>
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
            <h1 className={styles.title}>Your Comm3nts Widgets</h1>
            <div className={styles.form}>
            <WidgetList
              did={did?.hasParent ? did?.parent : did?.id as string}/>
            
              <button
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
              </button>
            </div>
          </>
        }
      </main>
      <footer className={styles.footer}>
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
      </footer>
    </div>
  );
}

export default Home
