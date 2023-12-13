import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import type { FastifyReply, FastifyViteConfig } from 'fastify'
import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import FastifyStatic from '@fastify/static'
import apiRoutes from './apiRoutes'
import { BASEPATH_PLACEHOLDER } from './constants'

export const createApp = async () => {
  const fastify = Fastify({
    logger: true
  })

  const basePath = process.env.BASEPATH || ''

  await fastify.register(FastifyVite, {
    root: import.meta.url,
    dev: process.env.NODE_ENV !== 'production',
    spa: true,
    createHtmlFunction(source: string, _scope: unknown, config: FastifyViteConfig) {
      // For now, we only support spa mode.
      if (!config.spa) {
        throw new Error('Must have spa enabled')
      }

      // The basepath for the asset urls in the index.html is set to
      // BASEPATH_PLACEHOLDER at build time (see vite.config.ts). At runtime,
      // we replace it with the actual basepath.
      const modifiedSource = source.replaceAll(BASEPATH_PLACEHOLDER, basePath)
      const indexHtmlTemplate = config.createHtmlTemplateFunction(modifiedSource)

      return function (this: FastifyReply) {
        this.type('text/html')
        this.send(
          indexHtmlTemplate({
            element: '',
            // The index.html contains a placeholder for injecting an inline
            // script tag with the appConfig. This is used to pass the basepath
            // down to the browser.
            inlineConfig: `<script type="text/javascript">window.appConfig = { basepath: '${basePath}' }</script>`
          })
        )
        return this
      }
    }
  })

  // All api routes are registered with the basepath prefix.
  fastify.register(apiRoutes, { prefix: basePath })

  // fastify/static is used to server all the static assets _except_
  // index.html. This is because we want to inject the basepath into the
  // index.html at runtime.
  fastify.register(FastifyStatic, {
    root: dirname(fileURLToPath(new URL(import.meta.url))) + '/frontend/dist/frontend',
    prefix: basePath,
    wildcard: false,
    index: false
  })

  // This method is defined by the createHtmlFunction method in the
  // fastify/vite config, which will handle our basepath injection.
  fastify.get(`${basePath}*`, (_, reply) => reply.html())

  await fastify.vite.ready()
  return fastify
}

if (process.argv[1] === fileURLToPath(new URL(import.meta.url))) {
  const app = await createApp()
  await app.listen({ port: parseInt(process.env.PORT || '3000', 10), host: process.env.ADDRESS || '0.0.0.0' })
}
