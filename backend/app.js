import fastify from 'fastify'
import fastifySocketIO from 'fastify-socket.io';
import registerRoutes from './routes/index.js';
import { buildAdminRouter } from './config/setup.js';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';

//creating app, will listen this server inside server.js
export const app = fastify();

// Register Routes
app.register(fastifySocketIO, {
    cors: {
        origin: '*'
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ['websocket']
})
await registerRoutes(app);

await buildAdminRouter(app);
