import KeyDIDResolver from 'key-did-resolver'

import { randomBytes } from 'crypto';
import { toString } from 'uint8arrays/to-string';
import { writeFile } from 'fs';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import {homedir} from "os"


const generateAdminKeyDid = async ()/*: Promise<{seed: string, did: DID}>*/ => {
  const seed = new Uint8Array(randomBytes(32))
  const keyResolver = KeyDIDResolver.getResolver()
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: { ...keyResolver },
  });

  await did.authenticate()
  return {seed:toString(seed, 'base16'), did}
};

const generateLocalConfig = async (adminSeed, adminDid, directory) => {
  console.log("Generating ComposeDB configuration file");
  const configData = {
    anchor: {},
    "http-api": {
      "cors-allowed-origins": [".*"],
      "admin-dids": [adminDid.id],
    },
    ipfs: {
      mode: "bundled",
    },
    logger: {
      "log-level": 2,
      "log-to-files": false,
    },
    metrics: {
      "metrics-exporter-enabled": false,
      "metrics-port": 9090,
    },
    network: {
      name: "testnet-clay",
    },
    node: {},
    "state-store": {
      mode: "fs",
      "local-directory": `~/.ceramic/statestore/`,
    },
    indexing: {
      // db: `sqlite://${homedir()}/.ceramic/indexing.sqlite`,
      // db: `postgres://postgres:your-super-secret-and-long-postgres-password@localhost:5432/ceramic`,
      db: `postgres://postgres:postgres@localhost:54322/postgres?schema=ceramic`,
      "allow-queries-before-historical-sync": true,
      models: [],
    },
  };

    writeFile(
      `${process.cwd()}/${directory}/composedb.config.json`,
      JSON.stringify(configData),
      (err) => {
        if (err) {
          console.error(err);
        }
        console.log("ComposeDB file generated successfully.");
      }
    );

    writeFile(`${process.cwd()}/${directory}/admin_seed.txt`, adminSeed,
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
};

export const generateConfig = async () => {
  const {seed, did} = await generateAdminKeyDid();
  await generateLocalConfig(seed, did, '.');
}

try {
  generateConfig();
} catch (error) {
  console.log('error', error);
}