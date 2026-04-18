import { Form, Formik } from 'formik'
import AuthCard from '../../components/auth/AuthCard'
import PasswordField from '../../components/form/PasswordField'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

type ResetPasswordState = {
  email?: string
}

const resetPasswordSchema = Yup.object({
  password: Yup.string().min(8, 'Minimum 8 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your new password'),
})

export default function ResetPasswordPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResetPasswordState | null

  return (
    <AuthCard
      badge="Set new password"
      badgeClassName="text-cyan-700"
      title="Reset password"
      subtitle={state?.email ? `Reset password for ${state.email}.` : 'Enter your new password below.'}
      footer={
        <>
          Back to{' '}
          <Link to="/login" className="font-semibold text-cyan-700 hover:text-cyan-900">
            login
          </Link>
        </>
      }
    >
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={resetPasswordSchema}
        onSubmit={(_, { setSubmitting }) => {
          setSubmitting(false)
          navigate('/login')
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <PasswordField
              id="password"
              name="password"
              label="New password"
              placeholder="Enter new password"
              focusClassName="focus:border-cyan-500"
            />

            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm new password"
              placeholder="Confirm new password"
              focusClassName="focus:border-cyan-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-cyan-700 px-4 py-3 font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Updating...' : 'Update password'}
            </button>
          </Form>
        )}
      </Formik>
    </AuthCard>
  )
}
