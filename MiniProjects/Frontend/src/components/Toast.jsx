function Toast({
  message,
  type = "info",
  onClose
}) {
  const styles = {
    success:
      "bg-green-500",
    error:
      "bg-red-500",
    warning:
      "bg-yellow-500 text-black",
    info:
      "bg-blue-500"
  }

  return (
    <div
      className={`fixed top-5 right-5 z-50 text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[320px] animate-bounce ${styles[type]}`}
    >
      <div className="flex justify-between items-center gap-4">

        <div>
          <p className="font-bold text-lg">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-xl"
        >
          ✕
        </button>

      </div>
    </div>
  )
}

export default Toast