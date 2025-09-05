import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import Button from "../components/Button"

export default function Home() {
  const navigate = useNavigate()
  const [highscores] = useLocalStorage("quiz.highscores", [])

  function start(difficulty = "any") {
    navigate(`/quiz?difficulty=${difficulty}`)
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      {/* Welcome Section */}
      <header className="space-y-3 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          🎉 Welcome to the Quiz
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Choose a difficulty and test your knowledge!  
          You’ll get <span className="font-medium">5–10 questions</span>.  
          After finishing, review your answers and track your high scores on this device.
        </p>
      </header>

      {/* Difficulty Buttons */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Select Difficulty
        </h2>
        <div className="grid sm:grid-cols-4 gap-3">
          <Button onClick={() => start("any")} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg">
            Any
          </Button>
          <Button onClick={() => start("easy")} className="bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md hover:shadow-lg">
            Easy
          </Button>
          <Button onClick={() => start("medium")} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md hover:shadow-lg">
            Medium
          </Button>
          <Button onClick={() => start("hard")} className="bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md hover:shadow-lg">
            Hard
          </Button>
        </div>
      </section>

      {/* High Scores */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          🏆 High Scores
        </h2>
        {highscores.length === 0 ? (
          <div className="text-sm text-gray-500 italic">
            No scores yet. Play your first quiz to set a record!
          </div>
        ) : (
          <ul className="space-y-2">
            {highscores.slice(0, 5).map((h, i) => (
              <li
                key={i}
                className="flex justify-between items-center rounded-lg px-4 py-2 border bg-white shadow-sm hover:shadow-md transition"
              >
                <span className="text-gray-600">{h.date}</span>
                <span className="font-medium text-gray-800">
                  {h.score}/{h.total}{" "}
                  <span className="text-sm text-gray-500">
                    ({h.difficulty})
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
