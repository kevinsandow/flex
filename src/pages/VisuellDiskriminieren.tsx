import { useState } from 'react'

const words = {
  A: ['Ameise', 'Ufo', 'Ampel', 'Anton', 'Affe', 'Amsel'],
  a: ['Rakete', 'lila', 'Salami', 'am', 'Lama', 'also', 'Hose'],
  M: ['Maus', 'Minute', 'Mofa', 'Melone', 'Mikado', 'Musik', 'Nase'],
  m: ['Kamel', 'Name', 'Opa', 'malen', 'Salami', 'im', 'Tomate'],
  O: ['Oma', 'Orkan', 'Ozean', 'Ole', 'Opa', 'Ofen', 'Ananas'],
  o: ['Dino', 'Domino', 'Telefon', 'Nadel', 'Foto', 'oben'],
  I: ['Igel', 'Wal', 'Insel', 'Isa', 'Imker', 'Ida', 'Internet'],
  i: ['im', 'Radio', 'in', 'Pirat', 'Puma', 'Salami', 'Omi'],
} as const

type Task = {
  letter: keyof typeof words
  word: string
}

function getRandomTask(): Task {
  const letters = Object.keys(words) as Array<keyof typeof words>
  const randomLetter = letters[Math.floor(Math.random() * letters.length)]
  const wordList = words[randomLetter]
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
  return { letter: randomLetter, word: randomWord }
}

export function VisuellDiskriminieren() {
  const [task, setTask] = useState<Task>(getRandomTask)
  const [selectedIndices, setSelectedIndices] = useState<Array<number>>([])
  const [errorIndices, setErrorIndices] = useState<Array<number>>([])
  const [isResultPhase, setIsResultPhase] = useState(false)

  const handleSelect = (idx: number) => {
    if (isResultPhase) return
    setErrorIndices([])
    setSelectedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    )
  }

  const checkAnswer = () => {
    const target = task.letter
    const wordArr = Array.from(task.word)
    const correctIndices = wordArr
      .map((char, idx) => (char === target ? idx : -1))
      .filter((idx) => idx !== -1)

    // Combine incorrect selections and missed correct indices
    const incorrect = selectedIndices.filter((idx) => wordArr[idx] !== target)
    const missed = correctIndices.filter(
      (idx) => !selectedIndices.includes(idx),
    )
    const errors = Array.from(new Set([...incorrect, ...missed]))
    setErrorIndices(errors)

    const allCorrect =
      selectedIndices.length === correctIndices.length &&
      selectedIndices.every((idx) => wordArr[idx] === target) &&
      correctIndices.every((idx) => selectedIndices.includes(idx))
    if (allCorrect) {
      setIsResultPhase(true)
      setTimeout(() => {
        setTask(getRandomTask())
        setSelectedIndices([])
        setErrorIndices([])
        setIsResultPhase(false)
      }, 1000)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <p className="mb-2 text-lg">Finde alle Buchstaben:</p>
      <div className="text-3xl font-bold mb-4 text-blue-600">{task.letter}</div>
      <div className="flex justify-center mb-4">
        {Array.from(task.word).map((char, idx) => {
          if (isResultPhase) {
            const isCorrect = char === task.letter
            return (
              <span
                key={idx}
                className={`mx-1 px-4 py-2 rounded border text-xl select-none
                  ${isCorrect ? 'bg-green-300 border-green-500 font-bold text-green-900' : 'bg-white border-gray-300'}`}
              >
                {char}
              </span>
            )
          } else {
            let btnClass = 'bg-white border-gray-300'
            if (errorIndices.includes(idx)) {
              btnClass = 'bg-red-200 border-red-500'
            } else if (selectedIndices.includes(idx)) {
              btnClass = 'bg-blue-200 border-blue-500'
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`mx-1 px-4 py-2 rounded border text-xl ${btnClass}`}
              >
                {char}
              </button>
            )
          }
        })}
      </div>
      {!isResultPhase && (
        <button
          onClick={checkAnswer}
          className="px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center"
          aria-label="Prüfen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
