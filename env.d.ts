
// This file ensures TypeScript understands process.env in the client context
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
