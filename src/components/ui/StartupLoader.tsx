interface StartupLoaderProps {
  visible: boolean
}

export default function StartupLoader({ visible }: StartupLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <span className="text-3xl font-bold text-white tracking-tight">Storefront</span>
      <span className="mt-6 h-8 w-8 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
    </div>
  )
}
