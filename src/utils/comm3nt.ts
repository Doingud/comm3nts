import { ComposeClient } from "@composedb/client";
import type { Orbis } from "@orbisclub/orbis-sdk";

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
            channels {
              name
              type
              contextId
            }
          }
        }
      }
    `, {
      input: {
        id: widget.id,
        content: {
          name: widget.name,
          channels: widget.channels,
        }
      },
    });
    console.log('updating widget', data);
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
            channels {
              name
              type
              contextId
            }
          }
        }
      }
    `, {
      input: {
        content: widget
      },
    });
    console.log('create widget', data);
    if (errors) {
      console.log('graphql errors', errors);
      throw new Error(errors[0].message);
    }
    return data?.createComm3ntWidget?.document;
  } catch (error) {
    console.log('error', error);
  }

}

// export const getWidgets: IWidget[] = () => {
  
// }

// export const getWidgetsByUser: IWidget[] = () => {
  
// }
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
          name
          channels {
            name
            type
            contextId
          }
          author {
            id
            isViewer
          }
          id
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
        channels {
          type
          name
          contextId
        }
        author {
          id
        } 
      }
    }
  }
  `)
  const widget = data?.node as any
  console.log('widget fetched', widget);
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

export const fetchPostsWithContext = async (
  orbis: Orbis, 
  channel: IChannel, 
  partialContext: string, 
  page = 0 
) => {
  const { data, error, status } = await orbis.api
    .from("orbis_v_posts")
    .select()
    .like('context', `${channel.contextId}${partialContext}%`)
    .range(page * 50, (page + 1) * 50 - 1)
    .order('timestamp', { ascending: false })
  console.log('raw posts', data)
}
export const authenticate = async (orbis: Orbis, options: any) => {
  console.log('authenticating orbis', orbis);
  try {
    
    const res = await orbis.isConnected()
    console.log('orbis authenticated', res, orbis);
  } catch (error) {
    
    const res = await orbis.connect_v2(options);
    console.log('orbis authenticated', res, orbis);
  }
}