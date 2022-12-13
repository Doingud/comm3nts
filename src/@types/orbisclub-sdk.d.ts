declare module '@orbisclub/orbis-sdk' {
  export class Orbis {
        ceramic;
        session;
        api;
        chain = "ethereum";
        store;
        connect_v2: function;
        isConnected: function;
        getProfile: function;
        getPosts: function;
        logout: function;
  }
}