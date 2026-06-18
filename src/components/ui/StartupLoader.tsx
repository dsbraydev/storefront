interface StartupLoaderProps {
  visible: boolean
}

export default function StartupLoader({ visible }: StartupLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <span className="text-3xl font-bold text-gray-900 tracking-tight">Storefront</span>
      <span className="mt-6 h-8 w-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
    </div>
  )
}
