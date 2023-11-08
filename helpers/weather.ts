import { z } from 'zod'

export const DWDSchema = z.array(
  z.object({
    headLine: z.string(),
    event: z.string(),
    descriptionText: z.string()
  })
)

export type DWDType = z.infer<typeof DWDSchema>
