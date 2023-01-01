import LitJsSdk from "lit-js-sdk/build/index.node.js";
import fs from "fs";
import { serialize, recoverAddress } from "@ethersproject/transactions";
import {
  // hexlify,
  splitSignature,
  // hexZeroPad,
  joinSignature,
} from "@ethersproject/bytes";
import { recoverPublicKey, computePublicKey } from "@ethersproject/signing-key";

// this code will be run on the node
const litActionCode = fs.readFileSync("./build/signTxnTest.js");

const go = async (authSig) => {
  const litNodeClient = new LitJsSdk.LitNodeClient({
    alertWhenUnauthorized: false,
    minNodeCount: 6,
    debug: true,
    litNetwork: "serrano",
  });
  await litNodeClient.connect();
  
  const results = await litNodeClient.executeJs({
    code: litActionCode,
    authSig,
    jsParams: {
      publicKey: '0x04fc42544ec561c76c290c9c903b43ea8a19d02de0ff1d0625f2fc2732218f3157cbf97af11bf5f26a6e39412fd857aafb409a9d8072605fe769e6e1d0fece4cba'
    },
  });
  console.log("results", results);
  const { signatures, response } = results;
  console.log("response", response);
  const sig = signatures.sig1;
  const { dataSigned } = sig;
  const encodedSig = joinSignature({
    r: "0x" + sig.r,
    s: "0x" + sig.s,
    v: sig.recid,
  });

  const { txParams } = response;

  console.log("encodedSig", encodedSig);
  console.log("sig length in bytes: ", encodedSig.substring(2).length / 2);
  console.log("dataSigned", dataSigned);
  const splitSig = splitSignature(encodedSig);
  console.log("splitSig", splitSig);

  const recoveredPubkey = recoverPublicKey(dataSigned, encodedSig);
  console.log("uncompressed recoveredPubkey", recoveredPubkey);
  const compressedRecoveredPubkey = computePublicKey(recoveredPubkey, true);
  console.log("compressed recoveredPubkey", compressedRecoveredPubkey);
  const recoveredAddress = recoverAddress(dataSigned, encodedSig);
  console.log("recoveredAddress", recoveredAddress);

  // const txParams = {
  //   nonce: "0x0",
  //   gasPrice: "0x2e90edd000", // 200 gwei
  //   gasLimit: "0x" + (30000).toString(16), // 30k gas limit should be enough.  only need 21k to send.
  //   to: "0x50e2dac5e78B5905CB09495547452cEE64426db2",
  //   value: "0x" + (10000).toString(16),
  //   chainId,
  // };

  const txn = serialize(txParams, encodedSig);

  console.log("txn", txn);
  return txn;
};

export default go