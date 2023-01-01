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