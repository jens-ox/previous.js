import type { FastifyInstance } from 'fastify'
import { DWDSchema } from './helpers/weather'

export default async (fastify: FastifyInstance) => {
  fastify.get(`/wetter`, async () => {
    const data = await (
      await fetch('https://s3.eu-central-1.amazonaws.com/app-prod-static.warnwetter.de/v16/gemeinde_warnings_v2.json')
    ).json()
    const warnings = DWDSchema.parse(data.warnings)
    return warnings
  })
}
