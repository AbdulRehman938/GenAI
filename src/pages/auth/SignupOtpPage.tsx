import { ErrorMessage, Field, Form, Formik } from 'formik'
import AuthCard from '../../components/auth/AuthCard'
import ActionModal from '../../components/common/ActionModal'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

type SignupOtpState = {
  email?: string
}

const otpSchema = Yup.object({
  otp: Yup.string().matches(/^\d{6}$/, 'Enter a valid 6 digit OTP').required('OTP is required'),
})

export default function SignupOtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  const state = location.state as SignupOtpState | null
  const email = useMemo(() => state?.email ?? sessionStorage.getItem('pendingSignupEmail') ?? 'your email', [state?.email])

  const handleContinue = () => {
    const resolvedEmail = state?.email ?? sessionStorage.getItem('pendingSignupEmail') ?? 'user@example.com'
    localStorage.setItem('authToken', 'demo-auth-token')
    localStorage.setItem('authUser', resolvedEmail)
    sessionStorage.removeItem('pendingSignupEmail')
    setIsModalOpen(false)
    navigate('/dashboard')
  }

  return (
    <>
      <AuthCard
        badge="Verify signup"
        badgeClassName="text-emerald-700"
        title="Enter your OTP"
        subtitle={`We sent a 6 digit code to ${email}.`}
      >
        <Formik
          initialValues={{ otp: '' }}
          validationSchema={otpSchema}
          onSubmit={(_, { setSubmitting }) => {
            setSubmitting(false)
            setIsModalOpen(true)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="otp" className="mb-1 block text-sm font-medium text-slate-700">
                  6 digit OTP
                </label>
                <Field
                  id="otp"
                  name="otp"
                  inputMode="numeric"
                  maxLength={6}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                  placeholder="123456"
                />
                <ErrorMessage name="otp" component="p" className="mt-1 text-sm text-rose-600" />
              </div>

              <button
                type="button"
                onClick={() => setResendMessage('A new OTP has been sent to your email.')}
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                Resend OTP
              </button>

              {resendMessage ? <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{resendMessage}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
              </button>
            </Form>
          )}
        </Formik>
      </AuthCard>

      {isModalOpen ? (
        <ActionModal
          title="You are verified"
          message="Your account is verified successfully."
          actionLabel="Continue to dashboard"
          actionClassName="bg-emerald-700 hover:bg-emerald-800"
          onAction={handleContinue}
        />
      ) : null}
    </>
  )
}
