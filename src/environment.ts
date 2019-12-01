/* global process:true */

export const environments: any = {
    dev: {
        serverUrl: 'http://localhost:8000',
        gaTrackingId: 'UA-133313494-1'
    },
    prod: {
        serverUrl: 'https://vocabin.net:8000',
        gaTrackingId: 'UA-133313494-1'
    }
};

const env = process.env.ENVIRONMENT || 'dev';

export default environments[env];
