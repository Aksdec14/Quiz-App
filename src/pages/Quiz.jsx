/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { loadQuestions } from "../lib/trivia"
import QuestionCard from "../components/QuestionCard"
import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"
import Button from "../components/Button"

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export default function Quiz() {
  const navigate = useNavigate()
  const qs = useQuery()
  const difficulty = qs.get("difficulty") || "any"
  const amount = 10

  const [status, setStatus] = useState("loading") // loading | ready | error | finishing
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [timerKey, setTimerKey] = useState(0)

  const total = questions.length
  const current = questions[idx]

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setStatus("loading")
        const data = await loadQuestions({ amount, difficulty })
        if (!mounted) return
        setQuestions(data)
        setStatus("ready")
        setIdx(0)
        setSelected(null)
        setAnswers([])
        setTimerKey(k => k + 1)
      } catch (e) {
        setStatus("error")
      }
    })()
    return () => {
      mounted = false
    }
  }, [difficulty])

  function lockAndNext(selection) {
    const isCorrect = selection === current.answer
    const entry = {
      questionId: current.id,
      question: current.question,
      options: current.options,
      correctAnswer: current.answer,
      selected: selection,
      correct: isCorrect,
      difficulty: current.difficulty || "medium",
    }
    setAnswers(prev => [...prev, entry])

    if (idx + 1 < total) {
      setIdx(i => i + 1)
      setSelected(null)
      setTimerKey(k => k + 1)
    } else {
      setStatus("finishing")
      const score = [...answers, entry].filter(a => a.correct).length
      navigate("/results", {
        state: {
          answers: [...answers, entry],
          difficulty,
          score,
          total,
        },
      })
    }
  }

  function handleNext() {
    if (selected == null) return
    lockAndNext(selected)
  }

  function expireTimer() {
    lockAndNext(selected ?? "__NO_ANSWER__")
  }

  // Keyboard support
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Enter" || e.key === "ArrowRight") {
        if (selected != null) handleNext()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  // --- UI States ---
  if (status === "loading") {
    return (
      <div className="mx-auto max-w-xl space-y-6 animate-pulse">
        <div className="h-4 w-40 bg-gray-200 rounded-lg" />
        <div className="h-3 w-3/4 bg-gray-200 rounded-lg" />
        <div className="h-24 w-full bg-gray-200 rounded-xl" />
        <div className="h-10 w-28 bg-gray-200 rounded-lg" />
      </div>
    )
  }

  if (status === "error" || total === 0) {
    return (
      <div className="mx-auto max-w-xl space-y-4 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          ⚠️ Couldn’t load questions
        </h2>
        <p className="text-gray-600">
          You might be offline, the API may be slow, or the dataset was empty.
          Please try again.
        </p>
        <Button
          onClick={() => location.reload()}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      {/* Status bar */}
      <div className="space-y-2">
        <ProgressBar current={idx + 1} total={total} />
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="uppercase tracking-wide">
            Difficulty: <span className="font-medium">{difficulty}</span>
          </span>
          <Timer
            key={timerKey}
            seconds={30}
            onExpire={expireTimer}
            paused={false}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border bg-white p-5 sm:p-6 shadow-md transition">
        <QuestionCard
          question={current.question}
          options={current.options}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-end gap-3">
        {/* Optional Skip */}
        {/* <Button
          onClick={() => lockAndNext('__NO_ANSWER__')}
          className="border-gray-300 bg-white hover:bg-gray-50"
        >
          Skip
        </Button> */}

        <Button
          onClick={handleNext}
          disabled={selected == null}
          className={
            selected == null
              ? "opacity-50 cursor-not-allowed"
              : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm"
          }
        >
          {idx + 1 === total ? "Finish Quiz" : "Next"}
        </Button>
      </div>
    </div>
  )
}
