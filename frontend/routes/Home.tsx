import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

const DWDSchema = z.array(
  z.object({
    headLine: z.string(),
    event: z.string(),
    descriptionText: z.string()
  })
)

type DWDType = z.infer<typeof DWDSchema>

export default function Home() {
  const { isPending, error, data } = useQuery<DWDType>({
    queryKey: ['wetter'],
    queryFn: async () => {
      const data = await fetch('/wetter').then((res) => res.json())
      const warnings = DWDSchema.parse(data.warnings)
      return warnings
    }
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      {data.map((w, i) => (
        <div key={`event-${i}`} className="rounded-lg bg-white p-2 shadow">
          <span className="inline-block rounded-full bg-orange-100 px-2 text-xs font-medium text-orange-800">
            {w.event.toLowerCase()}
          </span>
          <h3 className="py-1 font-bold">{w.headLine}</h3>
          <p className="text-gray-700">{w.descriptionText}</p>
        </div>
      ))}
    </div>
  )
}
