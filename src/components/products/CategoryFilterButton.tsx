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
          ? 'bg-indigo-600 text-white'
          : 'bg-white border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
      }`}
    >
      {label}
    </button>
  )
}
