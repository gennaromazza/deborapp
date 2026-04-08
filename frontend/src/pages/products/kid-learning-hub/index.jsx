import { Home, ExternalLink } from 'lucide-react'

const APP_BASE_PATH = '/kid-learning-hub/'

export default function KidLearningHub() {
  return (
    <div className="min-h-screen bg-pastel-cream flex flex-col">
      <header className="bg-white/90 backdrop-blur sticky top-0 z-40 border-b border-pastel-lavender/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <a href="/" className="btn-secondary py-2 px-4 inline-flex items-center gap-2 text-sm">
            <Home className="w-4 h-4" />
            Home
          </a>

          <a
            href={APP_BASE_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2 px-4 inline-flex items-center gap-2 text-sm"
          >
            Apri in nuova scheda
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      <div className="flex-1 min-h-0 p-2 sm:p-4">
        <div className="w-full h-full min-h-[calc(100vh-96px)] rounded-3xl overflow-hidden shadow-soft-lg border border-pastel-lavender/40 bg-white">
          <iframe
            title="Kid Learning Hub"
            src={APP_BASE_PATH}
            className="w-full h-full border-0"
            loading="eager"
          />
        </div>
      </div>
    </div>
  )
}
