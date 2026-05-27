import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loading from '../pages/Loading';

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (target == null) return

    let frame
    const start = performance.now()

    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setValue(Math.round(eased * target))
      if (t < 1) frame = requestAnimationFrame(animate)
    }

    setValue(0)
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

function StatItem({ label, value }) {
  const display = useCountUp(value)

  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-bold tabular-nums">
        {display.toLocaleString()}
      </span>
      <span className="text-sm uppercase tracking-wide opacity-70">{label}</span>
    </div>
  )
}

function StatsCounter() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },
    staleTime: 60_000,
  })

  if (isError) return null

  if (isPending) return <Loading fullScreen={false} className="mb-6 h-16" />

  return (
    <div className="flex gap-12 justify-center mb-6">
      <StatItem label="Videos" value={data.numVideos} />
      <StatItem label="Channels" value={data.numChannels} />
    </div>
  )
}

export default StatsCounter
