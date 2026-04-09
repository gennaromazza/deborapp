import { Home, ExternalLink } from 'lucide-react'

const APP_BASE_PATH = '/imparando-le-divisioni-vol-1/'

export default function ImparandoLeDivisioniVol1() {
  return (
    <div className="h-[100dvh] bg-pastel-cream flex flex-col overflow-hidden">
      <header className="bg-white/90 backdrop-blur z-40 border-b border-pastel-lavender/30 shrink-0">
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

      <div className="flex-1 min-h-0 p-0 sm:p-2">
        <div className="w-full h-full rounded-none sm:rounded-3xl overflow-hidden shadow-soft-lg border-0 sm:border border-pastel-lavender/40 bg-white">
          <iframe
            title="Imparando le Divisioni con un Dinosauro - Vol. 1"
            src={APP_BASE_PATH}
            className="w-full h-full border-0 block"
            loading="eager"
          />
        </div>
      </div>
    </div>
  )
}
