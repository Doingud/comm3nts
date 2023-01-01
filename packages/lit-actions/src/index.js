import { serialize, computeAddress } from "@ethersproject/transactions";
import { arrayify } from "@ethersproject/bytes";
import { keccak256 } from "js-sha3";

async function go() {
  const fromAddress = computeAddress(publicKey);

  // get latest nonce
  const latestNonce = await Lit.Actions.getLatestNonce({
    address: fromAddress,
    chain: "polygon",
  });

  const txParams = {
    nonce: latestNonce,
    gasPrice: "0x2e90edd000", // 200 gwei
    gasLimit: "0x" + (30000).toString(16), // 30k gas limit should be enough.  only need 21k to send.
    to: "0xafec071327Fd0e1ef010dD75A962EAb02f33Ad47",
    value: "0x" + (10000).toString(16),
    chainId: 137,
  };

  Lit.Actions.setResponse({ response: JSON.stringify({ txParams }) });

  const serializedTx = serialize(txParams);
  console.log("serializedTx", serializedTx);

  const rlpEncodedTxn = arrayify(serializedTx);
  console.log("rlpEncodedTxn: ", rlpEncodedTxn);

  // const unsignedTxn = arrayify("0x" + keccak256(rlpEncodedTxn));
  // console.log("unsignedTxn: ", unsignedTxn);

  const unsignedTxn = keccak256.digest(rlpEncodedTxn);
  console.log("unsignedTxn: ", unsignedTxn);

  const toSign = unsignedTxn; //[65, 65, 65]; // this is the string "AAA" for testing
  const sig = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName: "sig1",
  });
  console.log("sig: ", sig);
}

go()