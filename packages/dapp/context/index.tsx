import { createContext, Dispatch, useContext, useReducer } from "react";
import { CeramicClient } from "@ceramicnetwork/http-client"
import { ComposeClient } from "@composedb/client";
import { Orbis } from "@orbisclub/orbis-sdk";

import { definition } from "../src/__generated__/definition.js";
import { RuntimeCompositeDefinition } from "@composedb/types";
import { DID } from "dids";
import { boolean } from "yup";

type State = {
  ceramic: CeramicClient;
  composeClient: ComposeClient;
  orbis: Orbis;
  did?: DID;
  isAuthenticating: boolean;
}

type Action =
 | { type: 'logout' }
 | { type: 'setDID', payload: { did?: DID } }
 | { type: 'toggleIsAuthenticating'}

/**
 * Configure ceramic Client & create context.
 */
export const ceramic = new CeramicClient("http://localhost:7007");

export const composeClient = new ComposeClient({
  ceramic: "http://localhost:7007",
  // cast our definition as a RuntimeCompositeDefinition
  definition: definition as RuntimeCompositeDefinition,
});

export const orbis = new Orbis();

const initialState = {
  ceramic: ceramic,
  composeClient: composeClient,
  orbis: orbis,
  isAuthenticating: false,
}
const CeramicContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({ 
  state: initialState,
  dispatch: () => null
});


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'logout':
      return initialState;
    case "setDID":
      return { 
        ...state, 
        did: action.payload.did 
      };
    case "toggleIsAuthenticating":
      return { 
        ...state, 
        isAuthenticating: !state.isAuthenticating 
      };
  }
}

export const CeramicWrapper = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <CeramicContext.Provider value={value}>
      {children}
    </CeramicContext.Provider>
  );
};

/**
 * Provide access to the Ceramic & Compose clients.
 * @example const { ceramic, compose } = useCeramicContext()
 * @returns CeramicClient
 */

export const useCeramicContext = () => useContext(CeramicContext);