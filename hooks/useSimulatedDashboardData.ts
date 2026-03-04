import { useEffect, useState } from "react"

export interface SimulatedDashboardData {
  ph: number
  turbidity: number
  tds: number
  orp: number
  ammonia: number
  flow: number
  temp: number
  saved: number
}

export function useSimulatedDashboardData(): SimulatedDashboardData {
  const [data, setData] = useState<SimulatedDashboardData>({
    ph: 7.2,
    turbidity: 12,
    tds: 145,
    orp: 320,
    ammonia: 0.3,
    flow: 11.4,
    temp: 28.5,
    saved: 2847,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ph: +(prev.ph + (Math.random() - 0.5) * 0.1).toFixed(1),
        turbidity: Math.max(1, +(prev.turbidity + (Math.random() - 0.5) * 2).toFixed(0)),
        tds: Math.max(50, +(prev.tds + (Math.random() - 0.5) * 5).toFixed(0)),
        orp: Math.max(200, +(prev.orp + (Math.random() - 0.5) * 10).toFixed(0)),
        ammonia: Math.max(0.1, +(prev.ammonia + (Math.random() - 0.5) * 0.05).toFixed(2)),
        flow: Math.max(5, +(prev.flow + (Math.random() - 0.5) * 0.5).toFixed(1)),
        temp: +(prev.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        saved: prev.saved + Math.floor(Math.random() * 3),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return data
}

