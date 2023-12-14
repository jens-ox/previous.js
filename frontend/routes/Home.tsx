import { useApiQuery } from '../hooks/useApiQuery'
import type { DWDType } from '@/helpers/weather'

export default function Home() {
  const { isPending, error, data } = useApiQuery<DWDType>('/wetter', ['wetter'])

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
