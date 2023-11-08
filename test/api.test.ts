import { expect, test } from 'vitest'
import supertest from 'supertest'
import { beforeAll } from 'bun:test'
import type { FastifyInstance } from 'fastify'
import { createApp } from '..'
import { DWDSchema } from '@/helpers/weather'

let app: FastifyInstance

beforeAll(async () => {
  app = await createApp()
})

test('with a running server', async () => {
  await app.ready()

  const response = await supertest(app.server).get('/wetter').expect(200)
  const parsedResult = DWDSchema.safeParse(response.body)
  expect(parsedResult.success).toEqual(true)
})
