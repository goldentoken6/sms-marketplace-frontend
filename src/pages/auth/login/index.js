import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { Seo } from 'src/components/seo'
import { paths } from 'src/paths'
import LoginIcon from '@mui/icons-material/Login'
import { useAuth } from 'src/hooks/use-auth'
import { useMounted } from 'src/hooks/use-mounted'
import { usePageView } from 'src/hooks/use-page-view'
import { useSearchParams } from 'src/hooks/use-search-params'
import { useRouter } from 'src/hooks/use-router'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SERVER_URL } from 'src/constants'

const initialValues = {
  email: '',
  password: '',
  submit: null
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string().max(255).required('Password is required')
})

const Page = () => {
  usePageView()
  const isMounted = useMounted()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo')
  const { signIn } = useAuth()
  const router = useRouter()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      console.log(values.email)
      // console.log(values.password)
      try {
        await signIn(values.email, values.password)
        if (isMounted()) {
          // returnTo could be an absolute path
          if (values.email === 'admin@gmail.com') {
            router.push(paths.admin.index)
          } else {
            router.push(paths.dashboard.index)
          }
        }
      } catch (err) {
        console.error('=========Error========', err)
        if (isMounted()) {
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: err})
          helpers.setSubmitting(false)
        }
        toast.error('Login failed');
      }
    }
  })

  return (
    <>
      <Seo title='Login' />
      <div>
        <Card elevation={16}>
          <CardHeader
            titleTypographyProps={{ variant: 'h3' }}
            sx={{ pb: 0 }}
            title='Log in'
          />
          <CardContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label='Email Address'
                  name='email'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='email'
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label='Password'
                  name='password'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='password'
                  value={formik.values.password}
                />
              </Stack>
              <Button
                fullWidth
                size='large'
                sx={{ mt: 2 }}
                type='submit'
                variant='contained'
              >
                Log In
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 3
                }}
              >
                {/* <Link
                  href={paths.auth.forgotPassword}
                  underline="hover"
                  variant="subtitle2"
                >
                  Forgot password?
                </Link> */}
              </Box>
            </form>
          </CardContent>
        </Card>
      </div>
      <ToastContainer autoClose={3000} draggableDirection='x' />
    </>
  )
}

export default Page
