import { fileURLToPath } from 'node:url'
import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'

const main = async () => {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(FastifyVite, {
    root: import.meta.url,
    dev: true,
    spa: true
  })

  fastify.get('/', (req, reply) => {
    reply.html()
  })

  await fastify.vite.ready()
  return fastify
}

if (process.argv[1] === fileURLToPath(new URL(import.meta.url))) {
  const server = await main()
  await server.listen({ port: 3000 })
}
