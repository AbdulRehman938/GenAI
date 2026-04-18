import { ErrorMessage, Field, Form, Formik } from 'formik'
import AuthCard from '../../components/auth/AuthCard'
import PasswordField from '../../components/form/PasswordField'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const signupSchema = Yup.object({
  fullName: Yup.string().min(2, 'Enter your full name').required('Full name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
})

export default function SignupPage() {
  const navigate = useNavigate()

  return (
    <AuthCard
      badge="Create account"
      badgeClassName="text-emerald-700"
      title="Sign up in seconds"
      subtitle="Fill in your details to access your dashboard."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-900">
            Log in
          </Link>
        </>
      }
    >
      <Formik
        initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={signupSchema}
        onSubmit={(values, { setSubmitting }) => {
          sessionStorage.setItem('pendingSignupEmail', values.email)
          setSubmitting(false)
          navigate('/signup/otp', { state: { email: values.email } })
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <Field
                id="fullName"
                name="fullName"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                placeholder="Jane Doe"
              />
              <ErrorMessage name="fullName" component="p" className="mt-1 text-sm text-rose-600" />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                placeholder="you@example.com"
              />
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-rose-600" />
            </div>

            <PasswordField
              id="password"
              name="password"
              label="Password"
              placeholder="Create a strong password"
              focusClassName="focus:border-emerald-500"
            />

            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              placeholder="Repeat your password"
              focusClassName="focus:border-emerald-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Creating account...' : 'Sign up'}
            </button>
          </Form>
        )}
      </Formik>
    </AuthCard>
  )
}
