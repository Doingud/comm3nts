import dotenv from 'dotenv';
import { authSig } from './authSig.js'
import signTx from './signTx.js'
import ceramicGenesis from './ceramicGenesis.js'
dotenv.config();

async function go() {
  const auth = await authSig();
  // const tx = await signTx(auth)
  // console.log('test done', auth, tx);
  const doc = await ceramicGenesis(auth)
  console.log('test done', );
}

go()