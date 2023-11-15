import { useCallback, useEffect, useState } from "react";
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from "react-hot-toast";

import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { RouterLink } from 'src/components/router-link'
import { paths } from 'src/paths'
import { wait } from 'src/utils/wait'
import { SERVER_URL } from 'src/constants'
import { usePageView } from 'src/hooks/use-page-view'
import { useAuth } from 'src/hooks/use-auth'
import { settingsApi } from 'src/api/settings'
import { useMounted } from 'src/hooks/use-mounted'

const Page = () => {
  usePageView()
  const isMounted = useMounted();

  const handleGetSettings = useCallback( async () => {
    try {
      const response = await settingsApi.getSettings();
      console.log('settingsPage. response >>>', response);
      if (isMounted()) {
        formik.setValues(response);  
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted])

  useEffect(() => {
    handleGetSettings();
  }, [])

  const formik = useFormik({
    initialValues: {
      sms_cost: 0.0
    },
    validationSchema: Yup.object({
      sms_cost: Yup.number().positive().min(0.5).required('SMS Cost is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await settingsApi.setSettings(formik.values);
        toast.success('Settings updated');
      } catch (err) {
        console.error(err);
        toast.success('Update settings failed');
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Seo title='Settings' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Settings</Typography>
              </Stack>
            </Stack>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.sms_cost && formik.errors.sms_cost)}
                  fullWidth
                  helperText={formik.touched.sms_cost && formik.errors.sms_cost}
                  label='SMS Cost'
                  name='sms_cost'
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.sms_cost}
                />
              </Grid>
            </Grid>
          </Stack>
          <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
        </Container>
      </Box>
    </form>
  )
}

export default Page
