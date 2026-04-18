import { ErrorMessage, Field, Form, Formik } from 'formik'
import AuthCard from '../../components/auth/AuthCard'
import ActionModal from '../../components/common/ActionModal'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

type ForgotOtpState = {
  email?: string
}

const otpSchema = Yup.object({
  otp: Yup.string().matches(/^\d{6}$/, 'Enter a valid 6 digit OTP').required('OTP is required'),
})

export default function ForgotPasswordOtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  const state = location.state as ForgotOtpState | null
  const email = useMemo(() => state?.email ?? 'your email', [state?.email])

  return (
    <>
      <AuthCard
        badge="Verify reset"
        badgeClassName="text-amber-700"
        title="Enter reset OTP"
        subtitle={`A 6 digit OTP was sent to ${email}.`}
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
                  placeholder="123456"
                />
                <ErrorMessage name="otp" component="p" className="mt-1 text-sm text-rose-600" />
              </div>

              <button
                type="button"
                onClick={() => setResendMessage('OTP resent successfully.')}
                className="text-sm font-semibold text-amber-700 hover:text-amber-900"
              >
                Resend OTP
              </button>

              {resendMessage ? <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">{resendMessage}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
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
          message="Now you can update password."
          actionLabel="Update password"
          actionClassName="bg-amber-600 hover:bg-amber-700"
          onAction={() => navigate('/reset-password', { state: { email: state?.email } })}
        />
      ) : null}
    </>
  )
}
