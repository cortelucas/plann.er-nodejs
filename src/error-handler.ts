import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { ClientError } from "./errors";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Invalid inputs',
      errors: error.flatten().fieldErrors
    })  
  }

  if (error instanceof ClientError) {
    return reply.status(400).send({
      message: error.message
    })
  }

  return reply.status(500).send({
    message: 'Something went wrong'
  })
}
