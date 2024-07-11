import cors from '@fastify/cors'
import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { confirmParticipant, confirmTrip, createActivity, createInvite, createLink, createTrip, getActivities, getLinks, getParticipants, healthCheck, updateTrip } from './routes'

const app = fastify()

const routes = [confirmParticipant, confirmTrip, createLink, createActivity, createInvite, createTrip, getActivities, getLinks, getParticipants, healthCheck, updateTrip]

app.register(cors, {
  origin: true
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

routes.map(route => app.register(route))

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP server running!')
})
