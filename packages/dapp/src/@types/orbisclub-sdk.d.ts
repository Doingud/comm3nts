declare module '@orbisclub/orbis-sdk' {
  export class Orbis {
        ceramic;
        session;
        api;
        chain: string;
        store;
        connect_v2: Function;
        isConnected: Function;
        getProfile: Function;
        getPosts: Function;
        logout: Function;
        getDids: Function;
        getGroup: Function;
        getChannel: Function;
        getCredentials: Function;
        createPost: Function;
  }
}