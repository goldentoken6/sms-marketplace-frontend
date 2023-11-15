import * as Yup from 'yup';
import { useFormik } from 'formik';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { paths } from 'src/paths';
import { useRouter } from 'src/hooks/use-router';
import { useMounted } from 'src/hooks/use-mounted';

const initialValues = {
  code: ''
};

const validationSchema = Yup.object({
  code: Yup
    .string()
    .min(6)
    .max(6)
    .required('Code is required')
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      if (isMounted()) {
        router.push(paths.auth.login)
      }
     }
  });

  return (
    <>
      <Seo title="Verify Code" />
      <div>
        <Card elevation={16}>
          <CardHeader
            sx={{ pb: 0 }}
            title="Verify code"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <FormControl error={!!(formik.touched.code && formik.errors.code)}>
                <FormLabel
                  sx={{
                    display: 'block',
                    mb: 2
                  }}
                >
                  Code
                </FormLabel>
                <MuiOtpInput
                  length={6}
                  onBlur={() => formik.handleBlur('code')}
                  onChange={(value) => formik.setFieldValue('code', value)}
                  onFocus={() => formik.setFieldTouched('code')}
                  sx={{
                    '& .MuiFilledInput-input': {
                      p: '14px'
                    }
                  }}
                  value={formik.values.code}
                />
                {!!(formik.touched.code && formik.errors.code) && (
                  <FormHelperText>
                    {formik.errors.code}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Verify
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
