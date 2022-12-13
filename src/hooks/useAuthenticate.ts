import { useCeramicContext } from 'context';
import { useEffect, useState } from 'react'
import { authenticateCeramic } from '../../src/utils'
import { authenticate } from '../../src/utils/comm3nt';

function useAutenticate() {
  const { state, dispatch } = useCeramicContext();
  const { ceramic, composeClient, orbis, did } = state

  const [isAuthenticating, setAuthenticating] = useState(false)
  
  const handleLogin = async () => {
    
    setAuthenticating(true);
    const ethProvider = window.ethereum;
    await authenticate(orbis, {
      provider: ethProvider,
      chain: 'ethereum',
      lit: true,
    });
    await authenticateCeramic(ceramic, composeClient);
    setAuthenticating(false);
    dispatch({ type: 'setDID', payload:{ did: ceramic.did } })

  }

  useEffect(() => {

    if(!did?.authenticated && did?.authenticated) {

      handleLogin()
    }
  }, [did])

  useEffect(() => {
    
    if(localStorage.getItem('ceramic-session') && !did?.authenticated && !isAuthenticating) {
      handleLogin()
    }
  }, [])

  const requireAuth = async () => {
    if (!did?.authenticated) {
      try {
        await handleLogin();
        return did?.authenticated;
      } catch (error) {
        console.error('Could not authenticate', error);
        return false;
      }
    }
    return true
  }

  const logout = async () => {
    await orbis.logout();
    // const emptyDid = new DID();
    // composeClient.setDID(emptyDid)
    // orbis.ceramic.did = emptyDid;
    // orbis.session = emptyDid;
    // ceramic.did = emptyDid
    // setDID(emptyDid);
    dispatch({type: 'logout'})
    console.log('useAuth logged out', did, orbis.session);
  }

  return {
    clients: {
      ceramic,
      composeClient,
      orbis
    },
    did,
    handleLogin,
    isAuthenticating,
    logout,
    requireAuth,
  }
}

export default useAutenticate