import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { GuestGuard } from 'src/guards/guest-guard'
import { Layout as AuthLayout } from 'src/layouts/auth'
import { Issuer } from 'src/utils/auth'
import { Suspense } from 'react'

const LoginPage = lazy(() => import('src/pages/auth/login'))
const RegisterPage = lazy(() => import('src/pages/auth/register'))

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <GuestGuard>
        <AuthLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </AuthLayout>
      </GuestGuard>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  }
]
