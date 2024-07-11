import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import nodemailer from 'nodemailer'
import z from 'zod'
import { ClientError } from '../errors'
import { getMailClient, prisma } from '../lib'

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      })
    }
  }, async (request, reply) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        participants: {
          where: { is_owner: false }
        }
      }
    })

    if (!trip) {
      throw new ClientError('Trip not found')
    }

    if (trip.is_confirmed) {
      return reply.redirect(`http://localhost:3000/trips/${tripId}`)
    }

    await prisma.trip.update({
      where: { id: tripId },
      data: { is_confirmed: true }
    })

    
    const mail = await getMailClient()
    
    await Promise.all(
      trip.participants.map(async (participant) => {
        const confirmationLink = `http://localhost:3000/participants/${participant.id}/confirm`
        const message = await mail.sendMail({
          from: {
            name: 'Equipe plann.er',
            address: 'oi@plann.er',
          },
          to: participant.email,
          subject: `Confirme sua presença na viagem para ${trip.destination} em ${dayjs(trip.starts_at).format('DD/MM/YYYY')}!`,
          html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
              <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong> na data de <strong>${dayjs(trip.starts_at).format('DD/MM/YYYY')}</strong> a <strong>${dayjs(trip.ends_at).format('DD/MM/YYYY')}</strong></p>
              <p></p>
              <p>Para confirmar a sua presença, clique no link abaixo:</p>
              <p></p>
              <p><a href="${confirmationLink}">Confirmar viagem</a></p>
              <p></p>
              <p>Caso você não saiba do que se trata esse e-mail, apenas ignore.</p>
            </div>
          `.trim(),
        })

        console.log(nodemailer.getTestMessageUrl(message))
      })
    )

    return reply.redirect(`http://localhost:3000/trips/${tripId}`)
  })
}
