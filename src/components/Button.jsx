export default function Button({ 
  as = "button", 
  variant = "primary", // new prop
  className = "", 
  ...props 
}) {
  const Cmp = as

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium " +
    "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:border-blue-700 " +
      "active:translate-y-px shadow-sm hover:shadow-md focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400 " +
      "active:translate-y-px shadow-sm hover:shadow-md focus:ring-gray-400",
    danger:
      "bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700 " +
      "active:translate-y-px shadow-sm hover:shadow-md focus:ring-red-500",
    ghost:
      "bg-transparent text-gray-700 border border-transparent hover:bg-gray-50 " +
      "active:translate-y-px focus:ring-gray-300"
  }

  return (
    <Cmp
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
