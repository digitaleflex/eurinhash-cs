import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
  // Transport is disabled in dev to avoid 'thread-stream' worker crashes with Turbopack
  // pino-pretty can still be used via CLI if needed: pnpm dev | pino-pretty
});
