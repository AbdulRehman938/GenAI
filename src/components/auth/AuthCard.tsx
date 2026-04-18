import type { ReactNode } from 'react'

type AuthCardProps = {
  badge: string
  badgeClassName: string
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export default function AuthCard({
  badge,
  badgeClassName,
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
        <p className={`mb-2 text-sm font-medium ${badgeClassName}`}>{badge}</p>
        <h1 className="mb-2 text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mb-8 text-sm text-slate-600">{subtitle}</p>

        {children}

        {footer ? <div className="mt-6 text-center text-sm text-slate-600">{footer}</div> : null}
      </section>
    </main>
  )
}
