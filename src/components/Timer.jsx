import { useEffect, useRef, useState } from "react"

export default function Timer({ seconds = 30, onExpire, paused }) {
  const [time, setTime] = useState(seconds)
  const savedExpire = useRef(onExpire)

  useEffect(() => {
    savedExpire.current = onExpire
  }, [onExpire])

  useEffect(() => {
    setTime(seconds)
  }, [seconds])

  useEffect(() => {
    if (paused) return
    if (time <= 0) {
      savedExpire.current?.()
      return
    }
    const id = setInterval(() => setTime((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [time, paused])

  const pct = Math.max(0, Math.round((time / seconds) * 100))
  const isWarning = time <= Math.floor(seconds * 0.25)

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Time text */}
      <div
        className={`text-sm font-semibold ${
          isWarning ? "text-red-600 animate-pulse" : "text-gray-700"
        }`}
      >
        ⏱ {time}s
      </div>

      {/* Progress bar */}
      <div
        className="h-3 flex-1 bg-gray-200 rounded-full overflow-hidden shadow-inner"
        aria-label="Timer progress"
      >
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isWarning
              ? "bg-gradient-to-r from-orange-500 to-red-600"
              : "bg-gradient-to-r from-amber-400 via-yellow-400 to-green-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
