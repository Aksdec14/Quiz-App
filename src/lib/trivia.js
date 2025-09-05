/* eslint-disable no-unused-vars */
// Fetch and normalize from Open Trivia DB OR fallback to local JSON.
// Ensures each question has: { id, question, options: string[4], answer: string, difficulty }

function decodeHtmlEntities(str) {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

export async function loadQuestions({ amount = 10, difficulty = 'any' } = {}) {
  const qs = new URLSearchParams({
    amount: String(amount),
    type: 'multiple',
  })
  if (['easy', 'medium', 'hard'].includes(difficulty)) {
    qs.set('difficulty', difficulty)
  }

  // Try API first, fallback to local JSON if offline/errors
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(`https://opentdb.com/api.php?${qs.toString()}`, {
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timeout)
    if (!res.ok) throw new Error('Network error')
    const data = await res.json()
    if (!data.results || data.results.length === 0) throw new Error('Empty data')

    const normalized = data.results.map((q, idx) => {
      const all = [...q.incorrect_answers, q.correct_answer]
        .map(decodeHtmlEntities)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)

      return {
        id: `api-${idx}-${crypto.randomUUID()}`,
        question: decodeHtmlEntities(q.question),
        options: all,
        answer: decodeHtmlEntities(q.correct_answer),
        difficulty: q.difficulty || 'medium',
      }
    })
    // Ensure 4 options (OTDB usually does)
    return normalized.slice(0, amount)
  } catch (e) {
    // Fallback to local questions
    const res = await fetch('/src/data/questions.json', { cache: 'no-store' })
    const local = await res.json()
    const shuffled = local.sort(() => Math.random() - 0.5).slice(0, amount)
    return shuffled
  }
}
