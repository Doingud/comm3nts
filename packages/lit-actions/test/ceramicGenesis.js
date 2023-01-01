import LitJsSdk from "lit-js-sdk/build/index.node.js";
import {
  encodeDIDWithLit,
  Secp256k1ProviderWithLit,
} from "key-did-provider-secp256k1-with-lit";
import { getResolver } from "key-did-resolver";
import { DID } from "dids";
import { CeramicClient } from "@ceramicnetwork/http-client"
// import { ComposeClient } from "@composedb/client";
import * as dagCbor from '@ipld/dag-cbor'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance';
import { SyncOptions } from '@ceramicnetwork/common'
import { CommitID, StreamID, StreamRef } from '@ceramicnetwork/streamid'

// this code will be run on the node
// const litActionCode = fs.readFileSync("./build/signTxnTest.js");
const ceramic = new CeramicClient("http://localhost:7007");

const DEFAULT_CREATE_OPTS = {
  anchor: true,
  publish: true,
  pin: true,
  sync: SyncOptions.NEVER_SYNC,
  syncTimeoutSeconds: 0,
}
const DEFAULT_DETERMINISTIC_OPTS = {
  anchor: false,
  publish: false,
  pin: true,
  sync: SyncOptions.PREFER_CACHE,
}
// async function create<T>(
//   ceramic: CeramicApi,
//   content: T | null,
//   metadata: ModelInstanceDocumentMetadataArgs,
//   opts: CreateOpts = {}
// ): Promise<ModelInstanceDocument<T>> {
//   opts = { ...DEFAULT_CREATE_OPTS, ...opts }
//   const signer: CeramicSigner = opts.asDID ? { did: opts.asDID } : ceramic
//   const commit = await ModelInstanceDocument._makeGenesis(signer, content, metadata)

//   return ceramic.createStreamFromGenesis<ModelInstanceDocument<T>>(
//     ModelInstanceDocument.STREAM_TYPE_ID,
//     commit,
//     opts
//   )
// }

// async function _makeGenesis<T>(
//   signer: CeramicSigner,
//   content: T,
//   metadata: ModelInstanceDocumentMetadataArgs
// ): Promise<SignedCommitContainer | GenesisCommit> {
//   const commit = await this._makeRawGenesis(signer, content, metadata)
//   if (metadata.deterministic) {
//     // Check if we can encode it in cbor. Should throw an error when invalid payload.
//     // See https://github.com/ceramicnetwork/ceramic/issues/205 for discussion on why we do this.
//     dagCbor.encode(commit)
//     // No signature needed for deterministic genesis commits (which cannot have content)
//     return commit
//   } else {
//     return ModelInstanceDocument._signDagJWS(signer, commit)
//   }
// }

// async function _makeRawGenesis<T>(
//   signer: CeramicSigner,
//   content: T,
//   metadata: ModelInstanceDocumentMetadataArgs
// ): Promise<GenesisCommit> {
//   if (!metadata.model) {
//     throw new Error(`Must specify a 'model' when creating a ModelInstanceDocument`)
//   }

//   let controller = metadata.controller
//   if (!controller) {
//     if (signer.did) {
//       await _ensureAuthenticated(signer)
//       // When did has a parent, it has a capability, and the did issuer (parent) of the capability
//       // is the stream controller
//       controller = signer.did.hasParent ? signer.did.parent : signer.did.id
//     } else {
//       throw new Error('No controller specified')
//     }
//   }

//   const header: GenesisHeader = {
//     controllers: [controller],
//     model: metadata.model.bytes,
//   }
//   if (!metadata.deterministic) {
//     header.unique = randomBytes(12)
//   }

//   return { data: content, header }
// }

const litActionSignAndGetSignature = async (
  sha256Payload: Uint8Array,
  context: ContextWithLit
): Promise<EcdsaSignature> => {

  log("[litActionSignAndGetSignature] sha256Payload: ", sha256Payload);
  log("[litActionSignAndGetSignature] authSig:", context.authSig);

  const authSig = context.authSig || await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });


  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });

  await litNodeClient.connect();

  log("[litActionSignAndGetSignature] ipfsId:", context.ipfsId);

  const jsParams = {
    toSign: Array.from(sha256Payload),
    publicKey: decodeDIDWithLit(context.did),
    sigName: "sig1",
  };

  log("[litActionSignAndGetSignature] jsParams:", jsParams);

  const executeOptions = {
    ...(context.ipfsId === undefined || ! context.ipfsId) && {code: context.litCode},
    ...(context.litCode === undefined || ! context.litCode) && {ipfsId: context.ipfsId},
    authSig,
    jsParams,
  }

  const res = await litNodeClient.executeJs(executeOptions);

  log("[litActionSignAndGetSignature] res.signatures:", res.signatures);

  const signature = res.signatures;

  return {
    r: signature.sig1.r,
    s: signature.sig1.s,
    recoveryParam: signature.sig1.recid,
  };
};

async function ask3Genesis(opts, content, metadata) {
  opts = { ...DEFAULT_CREATE_OPTS, ...opts }
  const signer = opts.asDID ? { did: opts.asDID } : ceramic

  if (!metadata.model) {
    throw new Error(`Must specify a 'model' when creating a ModelInstanceDocument`)
  }
    
  let controller = metadata.controller
  // if (!controller) {
  //   if (signer.did) {
  //     await _ensureAuthenticated(signer)
  //     // When did has a parent, it has a capability, and the did issuer (parent) of the capability
  //     // is the stream controller
  //     controller = signer.did.hasParent ? signer.did.parent : signer.did.id
  //   } else {
  //     throw new Error('No controller specified')
  //   }
  // }
  const header = {
    controllers: [controller],
    model: metadata.model.bytes,
    txn: metadata.txn
  }
  if (!metadata.deterministic) {
    header.unique = randomBytes(12)
  }

  const commit = { data: content, header }
  dagCbor.encode(commit)
  console.log('commit', commit);

  return ceramic.createStreamFromGenesis<ModelInstanceDocument<T>>(
    ModelInstanceDocument.STREAM_TYPE_ID,
    commit,
    opts
  )
}

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
  console.log('encoded did', encodedDID, authSig)
  const provider = new Secp256k1ProviderWithLit({
    did: encodedDID,
    ipfsId: "QmdtiScrmCouaV7utY9S9KYU8QZBEez4xTgPFj8PXzU2MU",
    pkpPublicKey:
      "0x04fc42544ec561c76c290c9c903b43ea8a19d02de0ff1d0625f2fc2732218f3157cbf97af11bf5f26a6e39412fd857aafb409a9d8072605fe769e6e1d0fece4cba",
    authSig,
  });
  const did = new DID({ provider, resolver: getResolver() });
  const streamId = StreamID.fromString('kjzl6hvfrbw6c6886z39i8l2oac1w6hdzoqvcp1spbiqqlchqzo1rrnudbtwl0m')
  console.log('streamId', streamId)
  await did.authenticate();
  // const doc = await ask3Genesis({
  //   asDID: did
  // }, null, {
  //   deterministic: true,
  //   txn: '0x',
  //   model: streamId,
  // })
  const doc = await ModelInstanceDocument.single(ceramic, {
    controller: did.id,
    // model: streamId,x
    deterministic: true,
  }, {
    asDID: did,
  })
  console.log('doc', doc)
  // const doc = await ModelInstanceDocument.load(ceramic, 'kjzl6kcym7w8y9xk8ewg25lc5awmx36xczwisdgq1dqhsj63c2r72u3y4hspxz5')
  // console.log('doc', doc, doc.state$.state$._value);
  return doc
  // // -- static lit action code hosted on https://ipfs.io/ipfs/QmYrfiMf6TDuU3NiTbZANiELNBCyn2f66Zok3gEuzRTYmL
  // console.log('new did', did)
  // await did.authenticate();
  // console.log("DID:", did);
  // const jws = await did.createJWS('hello world');
  // console.log('jws', jws)

};

export default go