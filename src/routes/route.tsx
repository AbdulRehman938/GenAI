import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.tsx'
import ForgotPasswordOtpPage from '../pages/auth/ForgotPasswordOtpPage.tsx'
import LoginPage from '../pages/auth/LoginPage.tsx'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage.tsx'
import SignupPage from '../pages/auth/SignupPage.tsx'
import SignupOtpPage from '../pages/auth/SignupOtpPage.tsx'
import DashboardHomePage from '../pages/dashboard/DashboardHomePage.tsx'

const isAuthenticated = () => Boolean(localStorage.getItem('authToken'))

function PublicOnlyRoute() {
	return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />
}

function PrivateRoute() {
	return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/login" replace />,
	},
	{
		element: <PublicOnlyRoute />,
		children: [
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/signup',
				element: <SignupPage />,
			},
			{
				path: '/signup/otp',
				element: <SignupOtpPage />,
			},
			{
				path: '/forgot-password',
				element: <ForgotPasswordPage />,
			},
			{
				path: '/forgot-password/otp',
				element: <ForgotPasswordOtpPage />,
			},
			{
				path: '/reset-password',
				element: <ResetPasswordPage />,
			},
		],
	},
	{
		element: <PrivateRoute />,
		children: [
			{
				path: '/dashboard',
				element: <DashboardHomePage />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to="/login" replace />,
	},
])
