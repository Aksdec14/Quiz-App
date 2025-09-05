/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Results() {
  const navigate = useNavigate()
  const { state } = useLocation() || {}
  const [highscores, setHighscores] = useLocalStorage('quiz.highscores', [])

  if (!state) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-gray-600">No results to show.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    )
  }

  const { answers, score, total, difficulty } = state

  // Persist score (top 10)
  const date = new Date().toLocaleString()
  const entry = { date, score, total, difficulty }
  if (!sessionStorage.getItem('savedThisResult')) {
    setHighscores(prev => [entry, ...prev].slice(0, 10))
    sessionStorage.setItem('savedThisResult', '1')
  }

  const pct = Math.round((score / total) * 100)

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Score Summary Card */}
      <div className="rounded-2xl border bg-white p-6 shadow-md text-center">
        <h1 className="text-2xl font-bold mb-2">Your Results</h1>
        <p className="text-gray-600 mb-4">
          You scored <span className="font-semibold">{score}/{total}</span> ({pct}%)
          <br />
          Difficulty: <span className="capitalize">{difficulty}</span>
        </p>

        {/* Progress Bar for score */}
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-500'} transition-[width] duration-500`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Answer Review Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Answer Review</h2>
        <ul className="space-y-4">
          {answers.map((a, i) => {
            const correct = a.correct
            const noAnswer = a.selected === '__NO_ANSWER__'
            return (
              <li
                key={a.questionId}
                className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-gray-500">Question {i + 1}</div>
                    <div className="font-medium">{a.question}</div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      correct
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
                  <div
                    className={`border rounded-lg p-2 ${
                      correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="text-gray-500">Your answer</div>
                    <div className={`${correct ? 'text-green-700' : 'text-red-700'} font-medium`}>
                      {noAnswer ? '— (No answer)' : a.selected}
                    </div>
                  </div>
                  <div className="border rounded-lg p-2 bg-blue-50 border-blue-200">
                    <div className="text-gray-500">Correct answer</div>
                    <div className="font-medium text-blue-700">{a.correctAnswer}</div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <Button
          onClick={() => navigate(`/quiz?difficulty=${difficulty}`)}
          className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
        >
          Restart
        </Button>
        <Button onClick={() => navigate('/')}>Home</Button>
      </div>
    </div>
  )
}
