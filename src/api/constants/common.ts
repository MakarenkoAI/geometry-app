const defaultSocketUrl = 'ws://localhost:8090';
const defaultScUrl = 'ws://localhost:8090';

export const SC_URL = process.env.SC_URL ?? defaultScUrl;
export const SOCKET_URL = process.env.SOCKET_URL ?? defaultSocketUrl;
