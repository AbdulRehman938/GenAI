import { ErrorMessage, Field, Form, Formik } from 'formik'
import AuthCard from '../../components/auth/AuthCard'
import PasswordField from '../../components/form/PasswordField'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
})

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <AuthCard
      badge="Welcome back"
      badgeClassName="text-sky-700"
      title="Log in to your account"
      subtitle="Use your email and password to continue."
      footer={
        <>
          No account yet?{' '}
          <Link to="/signup" className="font-semibold text-sky-700 hover:text-sky-900">
            Create one
          </Link>
        </>
      }
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          localStorage.setItem('authToken', 'demo-auth-token')
          localStorage.setItem('authUser', values.email)
          setSubmitting(false)
          navigate('/dashboard')
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                placeholder="you@example.com"
              />
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-rose-600" />
            </div>

            <PasswordField
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              focusClassName="focus:border-sky-500"
            />

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm font-medium text-sky-700 hover:text-sky-900">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Log in'}
            </button>
          </Form>
        )}
      </Formik>
    </AuthCard>
  )
}