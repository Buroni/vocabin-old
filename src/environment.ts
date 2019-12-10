/* global process:true */

export const environments: any = {
  development: {
    serverUrl: "http://localhost:8000",
    gaTrackingId: "UA-133313494-1"
  },
  production: {
    serverUrl: "https://vocabin.net:8000",
    gaTrackingId: "UA-133313494-1"
  }
};

const env = process.env.NODE_ENV || "development";

export default environments[env];
