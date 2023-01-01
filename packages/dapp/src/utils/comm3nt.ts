import { ComposeClient } from "@composedb/client";
import type { Orbis } from "@orbisclub/orbis-sdk";
import { getString } from "./reference";
import { kebabCase } from "./utils";

// maxLenght = 194 // namespace + ":" + reference + "/" + asset_namespace + ":" + asset_reference + / token_id 
// namespace:   [-a-z0-9]{3,8}
// reference:   [-_a-zA-Z0-9]{1,32}
// asset_namespace:   [-a-z0-9]{3,8}
// asset_reference:   [-.%a-zA-Z0-9]{1,64}
// token_id:   [-.%a-zA-Z0-9]{1,78}

// maxLenght = 194 // namespace + ":" + reference + "/" + asset_namespace + ":" + asset_reference + / token_id 
// caip + '@' + 
//
// protocol: 'orb' | 'nostr' | 'xmtp'
// lens post is an nft by itself
// networkId: 'mainnet' | 'testnet'
// channelId: name your own channel
// {}[-.%a-zA-Z0-9]{1,64}

// chainNamespace:chainReference/assetNamespace:assetReference/tokenId@[protocol: 'orbis' | 'lens' | 'nostr']:[networkId: 'mainnet' | 'testnet']:channelId{}[-.%a-zA-Z0-9]{1,64}
// eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769@[protocol: 'orb' | 'lens' | 'nostr']:[networkId: 'mainnet' | 'testnet']:channelId{}[-.%a-zA-Z0-9]{1,64}



// eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769@my-first-channel
// eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769@jufbgb
// eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769@lwfh
// eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769@wpeifh
// eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769@qelkokojoj

export type Edge = {
  node: object;
  cursor: string;
}

export enum IChannelType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export type IChannel = {
  id?: string;
  name: string;
  type: IChannelType
  contextId: string;
  ref?: string;
}

export type IAuthor = {
  id: string;
  isViewer: boolean;
}

export type IWidget = {
  id?: string;
  name: string;
  channels: IChannel[];
  author?: IAuthor;
  ref?: string;
  reverse?: boolean;
}

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export type WidgetListResponse = {
  node: {
    comm3ntWidgetList: {
      edges: IWidget[];
      pageInfo: PageInfo;
    };
  };
}

export const updateWidget = async (composeClient: ComposeClient, widget: IWidget): Promise<IWidget | undefined> => {
  try {
    const input = {
      id: widget.id,
      content: {
        name: widget.name,
        ref: getString(widget.ref),
        reverse: widget.reverse || false,
        channels: widget.channels.map(channel => {
          channel.ref = channel?.ref || kebabCase(channel.name)
          channel.contextId = `${getString(widget.ref)}@${getString(channel.ref)}`
          return channel
        }),
      }
    }

    const { data, errors} = await composeClient.executeQuery<{
      updateComm3ntWidget: {
        document: IWidget;
      }
    }>(`
      mutation updateWidget($input: UpdateComm3ntWidgetInput!) {
        updateComm3ntWidget(input: $input) {
          document {
            id
            name
            ref
            reverse
            channels {
              name
              type
              contextId
              ref
            }
          }
        }
      }
    `, {
      input,
    });
    
    if (errors) {
      console.log('graphql errors', errors);
      throw new Error(errors[0].message);
    }
    return data?.updateComm3ntWidget?.document;
  } catch (error) {
    console.log('error', error);
  }
}

export const createWidget = async (composeClient: ComposeClient, widget: IWidget): Promise<IWidget | undefined> => {
  try {
    const { data, errors} = await composeClient.executeQuery<{
      createComm3ntWidget: {
        document: IWidget;
      }
    }>(`
      mutation createWidget($input: CreateComm3ntWidgetInput!) {
        createComm3ntWidget(input: $input) {
          document {
            id
            name
            ref
            reverse
            channels {
              name
              type
              contextId
              ref

            }
          }
        }
      }
    `, {
      input: {
        content: widget
      },
    });

    if (errors) {
      console.log('graphql errors', errors);
      throw new Error(errors[0].message);
    }
    return data?.createComm3ntWidget?.document;
  } catch (error) {
    console.log('error', error);
  }

}

export const getWidgetChannel = (widget: IWidget, channel: IChannel) => {
  
}

export const getWidgets = async (composeClient: ComposeClient, did: string): Promise<{
  pageInfo: PageInfo | undefined;
  widgets: IWidget[] | undefined;
}> => {
  const size = 100;

  const { data, errors} = await composeClient.executeQuery<WidgetListResponse>(`
  fragment fullAccount on CeramicAccount {
    comm3ntWidgetList(first: ${size}) {
      edges {
        node {
          id
          name
          reverse
          ref
          channels {
            name
            type
            contextId
            ref
          }
          author {
            id
            isViewer
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
    query {
      node(id: "${did}") {
        ...fullAccount
      }
    }
  `);

  const widgets = data?.node.comm3ntWidgetList.edges;
  const pageInfo = data?.node.comm3ntWidgetList.pageInfo;
  
  return {
    widgets,
    pageInfo
  };
}

export const getWidget = async (composeClient: ComposeClient, stream : string) => {
  const { data, errors } = await composeClient.executeQuery<{
    node: IWidget;
  }>(`
  query {
    node(id: "${stream}") {
      id
      ... on Comm3ntWidget {
        id
        name
        ref
        reverse
        channels {
          type
          name
          contextId
          ref
        }
        author {
          id
        } 
      }
    }
  }
  `)
  const widget = data?.node as any

  return widget;
}

export const fetchReactions = async (orbis: Orbis, postId: string) => {
  const { data, error, status } = await orbis.api
    .from("orbis_reactions")
    .select('*')
    .eq('post_id', postId)
  ;
  return data;
}

export const fetchCredentials = async (orbis: Orbis, did: string) => {
  const { data, error, status } = await orbis.getCredentials(did);
  return data;
}

export const fetchPostsWithContext = async (
  orbis: Orbis, 
  contextId: string, 
  partialContext: string, 
  page = 0 
) => {
  const { data, error, status } = await orbis.api
    .from("orbis_v_posts")
    .select('context')
    .ilike('context', `${contextId}${partialContext}%`)
    // .like('context', `%nft%`)
    .range(page * 50, (page + 1) * 50 - 1)
    .order('timestamp', { ascending: false })

}
export const authenticate = async (orbis: Orbis, options: any) => {

  try {
    const res = await orbis.isConnected()

  } catch (error) {
    
    const res = await orbis.connect_v2(options);
    console.log('orbis authenticated', res, orbis);
  }
}

export const postComm3nt = async (
  orbis: Orbis,
  channel: IChannel,
  widget: IWidget,
  content: Record<string, any>,
) => {
  const envelop = {
    ...content,
    context: channel.contextId || channel.ref || widget.ref,
    // data: {
      //   ...content?.data
      //   // add custom datas here
      // }
  }
  // const encryptionRules = {};
  const res = await orbis.createPost(envelop)

  return res;
}