import { useEffect, useRef } from "react"

export default function QuestionCard({
  question,
  options,
  selected,
  onSelect,
}) {
  const firstBtn = useRef(null)

  // Auto-focus first option when question changes
  useEffect(() => {
    firstBtn.current?.focus()
  }, [question])

  return (
    <div className="space-y-5">
      {/* Question */}
      <h2
        className="text-lg sm:text-xl font-semibold leading-snug text-gray-800"
        aria-live="polite"
      >
        {question}
      </h2>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((opt, i) => {
          const active = selected === opt
          return (
            <button
              key={opt}
              ref={i === 0 ? firstBtn : null}
              onClick={() => onSelect(opt)}
              className={
                "group w-full text-left rounded-xl border px-5 py-3 transition-all duration-200 " +
                "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
                (active
                  ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-gray-300 hover:bg-gray-50 focus:ring-blue-400")
              }
              aria-pressed={active}
              aria-label={`Option ${i + 1}: ${opt}`}
            >
              <span
                className={
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-semibold mr-3 " +
                  (active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 group-hover:bg-gray-300")
                }
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="align-middle">{opt}</span>
            </button>
          )
        })}
      </div>

      {/* Tip */}
      <p className="text-xs text-gray-500 italic">
        💡 Tip: Use Tab/Enter or click to select. You must choose an option to
        continue.
      </p>
    </div>
  )
}
