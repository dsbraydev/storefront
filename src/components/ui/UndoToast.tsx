import { useEffect } from 'react'

interface UndoToastProps {
  message: string
  onUndo: () => void
  onDismiss: () => void
  duration?: number
}

const DISMISS_DURATION = 4000

export default function UndoToast({ message, onUndo, onDismiss, duration = DISMISS_DURATION }: UndoToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [onDismiss, duration])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg animate-fade-in">
      <span>{message}</span>
      <button
        onClick={onUndo}
        className="text-violet-400 hover:text-violet-300 transition-colors font-semibold"
      >
        Undo
      </button>
    </div>
  )
}
