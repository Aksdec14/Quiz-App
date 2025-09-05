export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full">
      {/* Label Row */}
      <div className="flex justify-between mb-1 text-xs font-medium text-gray-600">
        <span>
          Question <span className="font-semibold">{current}</span> of {total}
        </span>
        <span>{pct}%</span>
      </div>

      {/* Progress Container */}
      <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden shadow-inner">
        {/* Progress Fill */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
                     transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          role="progressbar"
        />
      </div>
    </div>
  )
}
