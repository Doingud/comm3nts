declare module '@orbisclub/orbis-sdk' {
  export class Orbis {
    ceramic: any;
    session: any;
    api: any;
    chain: string;
    store: any;
    connect_v2: Function;
    isConnected: Function;
    getProfile: Function;
    getPosts: Function;
    logout: Function;
    getDids: Function;
    getGroup: Function;
    getChannel: Function;
    getCredentials: Function;
  }
}