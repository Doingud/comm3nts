import { encodePayload, prepareCleartext, decodeCleartext } from 'dag-jose-utils'
import {
  encodeDIDWithLit,
} from "key-did-provider-secp256k1-with-lit";
import { StreamID } from '@ceramicnetwork/streamid'

const B64 = 'base64pad'
const B64_URL = 'base64url'

function encodeBase64(bytes) {
  return toString(bytes, B64)
}

function encodeBase64Url(bytes) {
  return toString(bytes, B64_URL)
}

function ES256KSignerWithLit(context) {
  log("[ES256KSignerWithLit]");

  const recoverable = false;

  return async (payload) => {
    const encryptedPayload = sha256(payload);

    log("[ES256KSignerWithLit] encryptedPayload:", encryptedPayload);

    const signature = await litActionSignAndGetSignature(
      encryptedPayload,
      context
    );

    log("[ES256KSignerWithLit] signature:", signature);

    return toJose(signature, recoverable);
  };
}

const signWithLit = async (
  payload,
  context
) => {
  const did = context.did;

  log("[signWithLit] did:", did);

  const kid = `${did}#${did.split(":")[2]}`;

  log("[signWithLit] kid:", kid);

  const protectedHeader = {};

  const header = toStableObject(
    Object.assign(protectedHeader, { kid, alg: "ES256K" })
  );

  log("[signWithLit] header:", header);

  log("[signWithLit] payload:", payload);

  return createJWS(
    typeof payload === "string" ? payload : toStableObject(payload),
    ES256KSignerWithLit(context),
    header
  );
};

async function ask3Genesis(content, metadata) {
  // opts = { ...DEFAULT_CREATE_OPTS, ...opts }
  // const signer = opts.asDID ? { did: opts.asDID } : ceramic

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
  // dagCbor.encode(commit)
  console.log('commit', commit);

  return commit
}

async function createJWS(
  payload,
  options
) {
  // if (this._client == null) throw new Error('No provider available')
  // if (this._id == null) throw new Error('DID is not authenticated')
  // if (this._capability) {
  //   const exp = this._capability.p.exp
  //   if (exp && Date.parse(exp) < Date.now()) {
  //     throw new Error('Capability is expired, cannot create a valid signature')
  //   }
  //   const cacaoBlock = await CacaoBlock.fromCacao(this._capability)
  //   const capCID = CID.asCID(cacaoBlock.cid)
  //   if (!capCID) {
  //     throw new Error(
  //       `Capability CID of the JWS cannot be set to the capability payload cid as they are incompatible`
  //     )
  //   }
  //   options.protected = options.protected || {}
  //   options.protected.cap = `ipfs://${capCID?.toString()}`
  // }
  // await LitActions.signEcdsa({
    //   payload,
    //   publicKey,
    //   sigName: "sig1",
    // });
    // const encodedDID = await encodeDIDWithLit(
    //   publicKey,
    // );
  const { jws } = await this._client.request('did_createJWS', {
    did: encodedDID,
    ...options,
    payload,
  })
  return jws
}

async function createDagJWS (payload, options) {
  const { cid, linkedBlock } = await encodePayload(payload)
  const payloadCid = encodeBase64Url(cid.bytes)
  Object.assign(options, { linkedBlock: encodeBase64(linkedBlock) })
  const jws = await createJWS(payloadCid, options)

  const compatibleCID = CID.asCID(cid)
  if (!compatibleCID) {
    throw new Error(
      'CID of the JWS cannot be set to the encoded payload cid as they are incompatible'
    )
  }
  jws.link = compatibleCID
  return { jws, linkedBlock }
}
// const publicKey = "0x04fc42544ec561c76c290c9c903b43ea8a19d02de0ff1d0625f2fc2732218f3157cbf97af11bf5f26a6e39412fd857aafb409a9d8072605fe769e6e1d0fece4cba"

async function createSuperChat() {
  console.log('do execute');
  const encodedDID = await encodeDIDWithLit(
    publicKey,
  );
  const modelStream = StreamID.fromString('kjzl6hvfrbw6c6886z39i8l2oac1w6hdzoqvcp1spbiqqlchqzo1rrnudbtwl0m')
  const commit = await ask3Genesis(null, {
    controller: encodedDID,
    model: modelStream,
    txn: '0x000'
  })

  const jws = await createDagJWS(commit)
  console.log('commit', commit);


  // fetch the streamID of ask3
  // check if the streamID data has required params
  
  // fetch the transaction data
  // validate the streamID and parse amount
  
  // build a ceramic stream for the superchat
  // sign the commit
  // return the dagJWS
  
}

createSuperChat();