import { ErrorMessage, Field, Form, Formik } from 'formik'
import AuthCard from '../../components/auth/AuthCard'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
})

export default function ForgotPasswordPage() {
  const navigate = useNavigate()

  return (
    <AuthCard
      badge="Reset access"
      badgeClassName="text-amber-700"
      title="Forgot password?"
      subtitle="Enter your email and we will send a reset link."
      footer={
        <>
          Remembered your password?{' '}
          <Link to="/login" className="font-semibold text-amber-700 hover:text-amber-900">
            Back to login
          </Link>
        </>
      }
    >
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)
          navigate('/forgot-password/otp', { state: { email: values.email } })
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
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
                placeholder="you@example.com"
              />
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-rose-600" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Send reset link'}
            </button>
          </Form>
        )}
      </Formik>
    </AuthCard>
  )
}
