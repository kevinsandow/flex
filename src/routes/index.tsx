import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center mt-20">
      <Link
        to="/visuell-diskriminieren"
        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition font-medium"
      >
        Visuell diskriminieren
      </Link>
    </div>
  )
}
