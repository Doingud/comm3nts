import axios from 'axios';
import { ChainId, ChainIdParams } from 'caip';
import type { AssetNameParams } from 'caip/dist/assetName';
import type { IAssetTypeReference } from './reference';

import chainData from './data/chainData';
import { Orbis } from '@orbisclub/orbis-sdk';

const orbis = new Orbis();

const SupportedChainIds = [
  1,
  3,
  4,
  5,
  42,
  11155111,
  137,
  80001,
  56,
  97,
  43114,
  43113,
  250,
  25,
  338,
  11297108109,
  42161,
];

export const supportedChains = SupportedChainIds.map(chainId => chainData.find(chain => chain.chainId === chainId))

export const chainList = SupportedChainIds.reduce((acc, chainId) => {
  acc[`${chainId}`] = chainData.find(chain => chain.chainId === chainId)
  return acc;
}, {} as any)

export async function getNftCollectionMetadata(chain: string, address: string) {
  const options = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/nft/${address}/metadata`,
    params: {
      chain: chainList[chain]?.shortName,
    },
    headers: {accept: 'application/json', 'X-API-Key': process.env.MORALIS_API_KEY}
    };
  const collectionRequest = axios.request({
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/nft/${address}/metadata`,
    params: {
      chain: chainList[chain]?.shortName,
    },
    headers: {accept: 'application/json', 'X-API-Key': process.env.MORALIS_API_KEY}
  })
  const nftsRequest = axios.request({
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/nft/${address}`,
    params: {
      chain: chainList[chain]?.shortName,
      limit: 4,
      normalizedMetadata: true,
    },
    headers: {accept: 'application/json', 'X-API-Key': process.env.MORALIS_API_KEY}
  })
  const [collectionResult, nftsResult] = await Promise.all([collectionRequest, nftsRequest])

  console.log('Collection results', collectionResult, nftsResult)
  return {
    collection: collectionResult.data, 
    nfts: nftsResult.data
  }
  // return axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //     return error;
  //   });
}

export async function getContractNft(chain: string, address: string) {
  const options = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/nft/${address}`,
    params: {
      chain: chainList[chain]?.shortName,
      limit: 4,
      normalizedMetadata: true,
    },
    headers: {accept: 'application/json', 'X-API-Key': process.env.MORALIS_API_KEY}
    };

  return axios
    .request(options)
    .then(function (response) {
      console.log('getContractNft', response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
  
}

export async function getNft(chain: string, address: string, tokenId: string) {
  const options = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/nft/${address}/${tokenId}`,
    params: {
      chain: chainList[chain]?.shortName,
      limit: 4,
      normalizedMetadata: true,
    },
    headers: {accept: 'application/json', 'X-API-Key': process.env.MORALIS_API_KEY}
    };

  return axios
    .request(options)
    .then(function (response) {
      console.log('getContractNft', response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
  
}

export async function getContractToken(chain: string, address: string) {
  const options = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/erc20/metadata`,
    params: {
      chain: chainList[chain]?.shortName,
      addresses: address,
    },
    headers: {accept: 'application/json', 'X-API-Key': process.env.MORALIS_API_KEY}
    };

  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
  
}

export async function getAccount(chain: string, address: string) {
  // resolve orbis
  const { data, error } = await orbis.getDids(address);
  console.log('getAccount', address, data);
  
  // select best did to return or match the requested chain

  // resolve lens profile

  // resolve comm3nt profile

  return data;
  // console.log(data);
  // const options = {
  //   method: 'GET',
  //   url: `https://deep-index.moralis.io/api/v2/erc20/metadata`,
  //   params: {
  //     chain: chainList[chain],
  //     addresses: address,
  //   },
  //   headers: {accept: 'application/json', 'X-API-Key': process.env.MORALIS_API_KEY}
  //   };

  // return axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //     return error;
  //   });
  
}

