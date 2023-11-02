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
}

export {}
