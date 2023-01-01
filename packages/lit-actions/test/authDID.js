import LitJsSdk from "lit-js-sdk/build/index.node.js";
import {
  encodeDIDWithLit,
  Secp256k1ProviderWithLit,
} from "key-did-provider-secp256k1-with-lit";
import { getResolver } from "key-did-resolver";
import { DID } from "dids";

// this code will be run on the node
// const litActionCode = fs.readFileSync("./build/signTxnTest.js");

const go = async (authSig) => {
  const litNodeClient = new LitJsSdk.LitNodeClient({
    alertWhenUnauthorized: false,
    minNodeCount: 6,
    debug: true,
    litNetwork: "serrano",
  });
  await litNodeClient.connect();
  const encodedDID = await encodeDIDWithLit(
      "0x04fc42544ec561c76c290c9c903b43ea8a19d02de0ff1d0625f2fc2732218f3157cbf97af11bf5f26a6e39412fd857aafb409a9d8072605fe769e6e1d0fece4cba",
  );
  console.log('encoded did', encodedDID)
  // -- static lit action code hosted on https://ipfs.io/ipfs/QmYrfiMf6TDuU3NiTbZANiELNBCyn2f66Zok3gEuzRTYmL
  const provider = new Secp256k1ProviderWithLit({
    did: encodedDID,
    ipfsId: "QmdtiScrmCouaV7utY9S9KYU8QZBEez4xTgPFj8PXzU2MU",
    pkpPublicKey:
      "0x04fc42544ec561c76c290c9c903b43ea8a19d02de0ff1d0625f2fc2732218f3157cbf97af11bf5f26a6e39412fd857aafb409a9d8072605fe769e6e1d0fece4cba",
    authSig,
  });
  const did = new DID({ provider, resolver: getResolver() });
  console.log('new did', did)
  await did.authenticate();
  console.log("DID:", did);
  const jws = await did.createJWS('hello world');
  console.log('jws', jws)

};

export default go