import axios from "axios";
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { ChainId, AccountId, AssetId, AssetType, AssetTypeParams, AssetIdParams, AccountIdParams, ChainIdParams } from "caip";
import { AssetNameParams } from "caip/dist/assetName";
import { isAddress } from 'ethers/lib/utils';
import { StreamID } from '@ceramicnetwork/streamid';
import { orbis } from '../../context';

export type IReferenceParams = AssetTypeParams
  | AssetIdParams
  | AccountIdParams
  | ChainIdParams
;

export enum IInstance {
  AssetType = 'AssetType',
  AssetId = 'AssetId',
  AccountId = 'AccountId',
  ChainId = 'ChainId',
  URL = 'URL',
  CID = 'CID',
  StreamId = 'StreamId',
};

// type ExtractInstanceType<T> = T<infer R ? R : never>;

export type IAssetTypeReference = {
  kind: IInstance.AssetType;
  ref: AssetTypeParams;
}
export type IAssetIdReference = {
  kind: IInstance.AssetId;
  ref: AssetIdParams;
}
export type IAccountIdReference = {
  kind: IInstance.AccountId;
  ref: AccountIdParams;
}
export type IChainIdReference = {
  kind: IInstance.ChainId;
  ref: ChainIdParams;
}
export type IURLReference = {
  kind: IInstance.URL;
  ref: URL;
}
export type IStreamId = {
  kind: IInstance.StreamId;
  ref: StreamID;
}

// export type IReference =
// | ReturnType<typeof isAssetType>
// | ReturnType<typeof isAssetId>
// | ReturnType<typeof isAccount>
// | ReturnType<typeof isChain>;
export type IReference =
| IAssetTypeReference
| IAssetIdReference
| IAccountIdReference
| IChainIdReference
| IURLReference
| IStreamId
;


export function isAsset(reference: IReferenceParams): reference is (AssetTypeParams | AssetIdParams) {
  return true;
  // if (reference instanceof AssetType)
  //     return IInstance.AssetType;
  // else if (reference instanceof AssetId)
  //     return IInstance.AssetId;
  // else if (reference instanceof AccountId)
  //     return IInstance.AccountId;
  // else if (reference instanceof ChainId)
  //     return IInstance.ChainId;
  // return undefined;
}


function isChain(reference: string): IChainIdReference | false {
  try {
    const res = ChainId.parse(reference);
    return {
      kind: IInstance.ChainId,
      ref: res
    };
  } catch (error) {
    return false
  }
}
function isAccount(reference: string): IAccountIdReference | false{
  try {
    const res = AccountId.parse(reference);
    return {
      kind: IInstance.AccountId,
      ref: res
    };
  } catch (error) {
    return false
  }
}
function isAssetId(reference: string): IAssetIdReference | false {
  try {
    const res = AssetId.parse(reference);
    return {
      kind: IInstance.AssetId,
      ref: res
    };
  } catch (error) {
    return false
  }
}

function isAssetType(reference: string): IAssetTypeReference | false{
  try {
    const res = AssetType.parse(reference);
    return {
      kind: IInstance.AssetType,
      ref: res
    };
  } catch (error) {
    return false
  }
}

function isUrl(reference: string): IURLReference | false {
  try {
    const url = new URL(reference);

    if (url.origin !== 'null' && url.host) {
  
      return {
        kind: IInstance.URL,
        ref: url,
      };
    }
    
  } catch (error) {
    return false;  
  }
  return false;
}

function isStreamId(reference: string): IStreamId | false {
  try {
    const streamid = StreamID.fromString(reference);
    return {
      kind: IInstance.StreamId,
      ref: streamid,
    }
  } catch (error) {
    return false;
  }
}

// function getRef(referenceInput: string): ReturnType<typeof IReference> {
//   return isAssetId(referenceInput) || isAssetType(referenceInput) || isAccount(referenceInput) || isChain(referenceInput)
// }IAssetTypeReference
export function parseReference(contextId: string): IChainIdReference;
export function parseReference(contextId: string): IAccountIdReference;
export function parseReference(contextId: string): IAssetIdReference;
export function parseReference(contextId: string): IAssetTypeReference;
export function parseReference(contextId: string): IURLReference;
export function parseReference(contextId: string): IReference | string | undefined {
  const [referenceInput, channelContext] = contextId.split('@');
  const res = isStreamId(referenceInput) || isUrl(referenceInput) || isAssetId(referenceInput) || isAssetType(referenceInput) || isAccount(referenceInput) || isChain(referenceInput);
  if (!res) {
    console.log('bad reference', contextId)
    // return contextId;
    // throw new Error('not a compatible caip reference input')
    return;
  }
  const { kind, ref } = res;
  // check for invalid eth addresses
  switch (kind) {
    case IInstance.AssetId:
    case IInstance.AssetType:
      const asset = ref.assetName as AssetNameParams;
      if ((ref.chainId as ChainIdParams).namespace === 'eip155') {
        if(!isAddress(asset.reference)) {
          console.log('invalid asset address', asset.reference)
          // throw new Error('invalid asset address')
          return undefined;
        }
      }
      break;
    case IInstance.AccountId:
      if ((ref.chainId as ChainIdParams).namespace === 'eip155') {
        if(!isAddress(ref.address)) {
          console.log('invalid address', ref.address)
          // throw new Error('invalid address')
          return undefined;
        }
      }
      break;
  
    default:
      // return contextId;
      break;
  }

  return res
}

export function flatten(value: any) {
  return {
    chainNamespace: value?.chainId?.namespace || value?.namespace,
    chainReference: value?.chainId?.reference || value?.reference,
    assetReference: value?.assetName?.reference,
    assetNamespace: value?.assetName?.namespace,
    address: value?.address ,
    tokenId: value?.tokenId
  }
}

export function getString(flatObject: any) {
  if(typeof flatObject === 'string') return flatObject;
  return `${flatObject?.chainNamespace}${flatObject?.chainReference ? `:${flatObject?.chainReference}` : ''}${flatObject?.assetNamespace ? `/${flatObject?.assetNamespace}` : ''}${flatObject?.assetReference ? `:${flatObject?.assetReference}` : (flatObject?.address ? `:$flatObject?.${flatObject?.address}` : '')}${flatObject?.tokenId ? `/${flatObject?.tokenId}` : ''}`
}

export async function resolveReference(reference: IChainIdReference): Promise<any>;
export async function resolveReference(reference: IAccountIdReference): Promise<any>;
export async function resolveReference(reference: IAssetTypeReference): Promise<any>;
export async function resolveReference(reference: IAssetIdReference): Promise<any>;
export async function resolveReference(reference: IURLReference): Promise<any>;
export async function resolveReference(reference: StreamID): Promise<any>;
export async function resolveReference(reference: IURLReference): Promise<any>;
export async function resolveReference<Type extends (IAssetIdReference | IAssetTypeReference | IAccountIdReference | IStreamId | IURLReference)>(reference: Type): Promise<any | false> {
  if (!reference) return false;
  const { kind, ref } = reference

  switch (kind) {
    case IInstance.AssetId:
      if(
        (ref.assetName as AssetNameParams).namespace === 'erc721' ||
        (ref.assetName as AssetNameParams).namespace === 'erc1155'
      ) {

        const asset = await getNft(ref.chainId as ChainIdParams, ref.assetName as AssetNameParams, ref.tokenId);
        return asset;
        // call nft endpoint to fetch metadatas
      }
        //     if(reference.assetName.namespace === 'erc20') {
      break;
    case IInstance.AssetType:
      if(
        (ref.assetName as AssetNameParams).namespace === 'erc721' ||
        (ref.assetName as AssetNameParams).namespace === 'erc1155'
      ) {

        const asset = await getNftCollection(ref.chainId as ChainIdParams, ref.assetName as AssetNameParams);
        return asset;
        // call nft endpoint to fetch metadatas of the collection
      }
      if((ref.assetName as AssetNameParams).namespace === ('erc20')) {
        // call token endpoint to fetch token symbol / name and icon
      }
      break;
    case IInstance.AccountId:
      const account = await getAccount(ref.chainId as ChainIdParams, ref.address);
      return account;
      // fetch orbis / lens / ens profile aggregation
      break;
    
    case IInstance.StreamId:
      const data = await getStreamData(ref);
      // fetch orbis / lens / ens profile aggregation
      return data;
      break;
    
    case IInstance.URL:
      const ograph = await getOpenGraph(ref);
      // fetch orbis / lens / ens profile aggregation
      return ograph;
      break;
    
    default:
      break;
  }

  return '';
}

export async function getNftCollection(chain: ChainIdParams, asset: AssetNameParams) {
  const options = {
    method: 'POST',
    url: `/api/nft-collection`,
    data: {
      chain: chain.reference,
      address: asset.reference,
    },
    headers: {accept: 'application/json'}
  };
  
  return axios
    .request(options)
    .then(function ({ data}) {
      const { result, total } = data;
      const firstNft = result[0];
      const nftMeta = JSON.parse(firstNft.metadata)
      return {
        kind: 'nft',
        pfp: nftMeta.image,
        name: firstNft.name,
      //   creator: data.creator,
      //   ref: data.streamId,
        description: nftMeta.description,
        result,
      };
      // return data
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
}

export async function getNft(chain: ChainIdParams, asset: AssetNameParams, tokenId: string) {
  const options = {
    method: 'POST',
    url: `/api/nft`,
    data: {
      chain: chain.reference,
      address: asset.reference,
      tokenId,
    },
    headers: {accept: 'application/json'}
  };
  return axios
    .request(options)
    .then(function ({ data: result}) {
      const nftMeta = JSON.parse(result.metadata)
      return {
        kind: 'nft',
        pfp: nftMeta.image,
        name: result.name,
      //   creator: data.creator,
      //   ref: data.streamId,
        description: nftMeta.description,
        result,
      };
      return result
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
}

export async function getToken(chain: ChainIdParams, asset: AssetNameParams) {
  const options = {
    method: 'POST',
    url: `/api/token`,
    data: {
      chain: chain.reference,
      address: asset.reference,
    },
    headers: {accept: 'application/json'}
  };
  return axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
}

export async function getAccount(chain: ChainIdParams, address: string) {
  const options = {
    method: 'POST',
    url: `/api/account`,
    data: {
      chain: chain.reference,
      address,
    },
    headers: {accept: 'application/json'}
  };
  return axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
}

export async function getOpenGraph(url: URL) {
  const options = {
    method: 'POST',
    url: `/api/o-graph`,
    data: {
      url: url.toString()
    //   chain: chain.reference,
    //   address: asset.reference,
    },
    headers: {accept: 'application/json'}
  };
  return axios
    .request(options)
    .then(function (response) {
      return {
        kind: 'website',
        pfp: response.data.ogImage?.url || response.data.twitterImage?.url,
        name: response.data.ogTitle || response.data.twitterTitle,
        description: response.data.ogDescription || response.data.twitterDescription,
        ref: response.data.requestUrl,
      }
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
}

export async function getStreamData(streamId: StreamID) {
  try {
    const { content, metadata } = await TileDocument.load(orbis.ceramic, streamId)

    if(metadata.tags && metadata.tags?.indexOf('orbis') > -1) {
      if (metadata.tags?.indexOf('group') > -1) {
        const { data, error } =  await orbis.getGroup(streamId);
        data.kind = 'group';
        if (error) return false;
        return {
          kind: 'group',
          pfp: data.content?.pfp,
          name: data.content?.name,
          creator: data.creator,
          ref: data.streamId,
          description: data.content?.description,
        };
      }
      if (metadata.tags?.indexOf('channel')  > -1) {
        const { data, error } =  await orbis.getChannel(streamId);
        if (error) return false;
        if (!data.content?.pfp) {
          const { data: group, error: errorGroup } =  await orbis.getGroup(data.group_id);
          let pfp = group.content?.pfp
          if (!pfp) {
            const { data: profile} =  await orbis.getProfile(data.creator);
            pfp = profile?.details?.profile?.pfp
          }
          data.content.pfp = pfp
          data.content.name = `${group.content?.name} / ${data.content.name}`
        }
        return {
          kind: 'channel',
          pfp: data.content?.pfp,
          name: data.content?.name,
          creator: data.creator,
          ref: data.streamId,
          description: data.content?.description,
        };
      }
      // if (metadata.tags?.indexOf('comm3nts')  > -1) {
      //   const { data, error } =  await orbis.getChannel(streamId);
      //   data.kind = 'channel';
      //   if (error) return false;
      //   return {
      //     pfp: data.content.pfp,
      //     name: data.content.name,
      //     creator: data.creator,
      //     ref: data.streamId,
      //   };
      // }
    }
    
    return content;
  } catch (error) {
    console.error(streamId.toString(), error);
  }
}

export function shortRef(reference: string) {
  return `${reference.slice(0, 6)}...${reference.slice(-4)}`
}

export default parseReference;
