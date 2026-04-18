import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DashboardHomePage() {
  const navigate = useNavigate()

  const userEmail = useMemo(() => localStorage.getItem('authUser') ?? 'user@example.com', [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    navigate('/login')
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl backdrop-blur-sm sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-cyan-700">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Welcome, {userEmail}</h1>
            <p className="mt-2 text-slate-600">You are successfully logged in.</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Log out
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
            <h2 className="text-lg font-semibold text-cyan-900">Profile Completion</h2>
            <p className="mt-2 text-sm text-cyan-800">75% complete</p>
          </article>
          <article className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <h2 className="text-lg font-semibold text-emerald-900">Active Projects</h2>
            <p className="mt-2 text-sm text-emerald-800">4 ongoing tasks</p>
          </article>
          <article className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <h2 className="text-lg font-semibold text-amber-900">Notifications</h2>
            <p className="mt-2 text-sm text-amber-800">2 unread alerts</p>
          </article>
        </div>
      </section>
    </main>
  )
}
