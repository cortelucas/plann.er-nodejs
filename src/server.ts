import cors from '@fastify/cors';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmTrip, createTrip, healthCheck } from './routes';

const app = fastify()

const routes = [healthCheck, createTrip, confirmTrip]

app.register(cors, {
  origin: true
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

routes.map(route => app.register(route))

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP server running!')
})
