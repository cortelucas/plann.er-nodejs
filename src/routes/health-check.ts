import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib'

export async function healthCheck(app: FastifyInstance) {
  app.get('/health-check', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // verifica se o banco de dados esta funcionando e retorna um boolean
      const result = await prisma.$queryRaw`SELECT 1`
      return reply.status(200).send({
        status: 'success'
      })
    } catch (error) {
      return reply.status(500).send({
        status: 'error',
        message: error
      })
    }
  })
}