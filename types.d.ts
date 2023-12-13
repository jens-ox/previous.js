/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

declare module 'fastify' {
  interface FastifyReply {
    html(): void
  }

  interface FastifyInstance {
    vite: {
      ready(): Promise<void>
    }
  }

  interface FastifyViteConfig {
    spa: boolean
    createHtmlTemplateFunction(source: string): ({ [key in string]: string }) => string
  }
}

declare global {
  interface Window {
    appConfig: {
      basepath: string
    }
  }
}

export {}
