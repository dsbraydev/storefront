interface SpinnerProps {
  className?: string
}

export default function Spinner({ className = 'h-4 w-4' }: SpinnerProps) {
  return (
    <span
      className={`${className} inline-block border-2 border-white border-t-transparent rounded-full animate-spin`}
      aria-hidden="true"
    />
  )
}
