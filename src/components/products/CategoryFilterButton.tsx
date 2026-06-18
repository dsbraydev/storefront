interface CategoryFilterButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export default function CategoryFilterButton({ label, isActive, onClick }: CategoryFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
      className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
        isActive
          ? 'bg-violet-600 text-white'
          : 'bg-gray-800 border border-gray-700 text-gray-400 hover:border-violet-500 hover:text-violet-400'
      }`}
    >
      {label}
    </button>
  )
}
