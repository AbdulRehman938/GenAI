type ActionModalProps = {
  title: string
  message: string
  actionLabel: string
  actionClassName: string
  onAction: () => void
}

export default function ActionModal({
  title,
  message,
  actionLabel,
  actionClassName,
  onAction,
}: ActionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <button onClick={onAction} className={`mt-5 w-full rounded-xl px-4 py-3 font-semibold text-white transition ${actionClassName}`}>
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
