import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMounted } from 'src/hooks/use-mounted';
import { useRouter } from 'src/hooks/use-router';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { paths } from 'src/paths';

const initialValues = {
  password: '',
  passwordConfirm: ''
};

const validationSchema = Yup.object({
  password: Yup
    .string()
    .min(7, 'Must be at least 7 characters')
    .max(255)
    .required('Required'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required')
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => { 
      if (isMounted()) {
        router.push(paths.auth.login);
      }
    }
  });

  return (
    <>
      <Seo title="Reset Password" />
      <div>
        <Card elevation={16}>
          <CardHeader
            sx={{ pb: 0 }}
            title="Reset Password"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
                  fullWidth
                  helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                  label="Password (Confirm)"
                  name="passwordConfirm"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.passwordConfirm}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Reset
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
